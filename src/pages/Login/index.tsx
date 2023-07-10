import { useState, useEffect } from "react";
import "./inex.less";
//  导入logo
import logo from "../../assets/image/logo.svg";
import { history } from "umi";
// 导入antd input
import { Input, Button, Switch, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { login as loginApi } from "../../api/login";
import rq from "../../utils/axios/index";

const obtainQRCodeImg = async (): Promise<any> => {
    return await rq({
        url: "/api/qrcode",
        method: "post",
        param: {},
        onerror: () => { },
    }).then((res: any) => {
        return res;
    });
};

const rts = () => {
    const [user, setUser] = useState(""); //绑定账号
    const [pwd, setPwd] = useState(""); //获取密码
    const [qrcode, setQRCode] = useState(""); //获取验证码
    const [qrCodeImg, setQRCodeImg] = useState({ __html: "" }); //获取验证码图
    const [watch, setWatch] = useState(false); //七天免登录开关



    // 登陆
    const login = async (user: string, pwd: string, qrcode: string, watch: boolean) => {

        const res = await loginApi(user, pwd, qrcode, watch);
        // 登陆成功

        if (res.code === 200) {
            window.localStorage.setItem("token", res.data.token);
            console.log(window.localStorage.getItem("token"));

            if (window.localStorage.getItem("token")) {
                history.push("/");
            }
        } else {
            setQRCode("");
            fetchQRCodeImg()
            setPwd("");
            message.error(res.message)
        }
    };


    // 刷新验证码
    const fetchQRCodeImg = async () => {
        const res = await obtainQRCodeImg();

        setQRCodeImg({ __html: res.data });
    };

    // 初始化页面
    useEffect(() => {
        fetchQRCodeImg();
    }, []);

    // 初始化获取验证码图片

    // 七天免登录
    const onPassLogOn = (checked: boolean) => {
        setWatch(checked);
        console.log(watch);
        
  
        
    };

    return (
        <>
            <div className="roots">
                <div className="content">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <div>{}</div>

                    <div className="title">最简单的博客后台管理 </div>
                    <div className="form">
                        <Input
                            placeholder="用户名"
                            className="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <Input.Password
                            placeholder="密码"
                            className="pwd"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                        <div className="codeDiv">
                            <Input
                                placeholder="验证码"
                                className="code"
                                value={qrcode}
                                onChange={(e) => setQRCode(e.target.value)}
                            />

                            <div
                                onClick={fetchQRCodeImg}
                                // onClick={obtainQRCodeImg(setQRCodeImg)}
                                className="rqcode"
                                dangerouslySetInnerHTML={{ __html: qrCodeImg.__html }}
                            ></div>
                        </div>
                        <div className="switch">
                            <span>7天免登录</span>{" "}
                            <Switch defaultChecked={watch} onChange={onPassLogOn} />
                        </div>

                        <Button
                            type="primary"
                            className="login"
                            onClick={() => login(user, pwd, qrcode, watch)}
                        >
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default rts;
