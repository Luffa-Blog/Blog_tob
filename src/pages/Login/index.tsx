import { useState } from 'react'
import "./inex.less"
//  导入logo
import logo from "../../assets/image/logo.svg"
// 导入antd input
import { Input, Button, Space } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import rq from "../../utils/axios/index"





const rts = () => {

    const login = (user: string, pwd: string, rqcode: number, rember: number = 1) => {
       
      console.log(123);
      



    }

    const [user, setUser] = useState("")//绑定账号
    const [pwd, setPwd] = useState("")//获取密码

// 获取验证码
    rq({
        url: '/api/qrcode',
        method: 'post',
        param: {},
        onerror: () => {

        }
    }).then((res: any) => {
        console.log(res);

    })

    return (
        <div className="roots">
            <div className="content">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <div className="title">最简单的博客后台管理 </div>
                <div className="form">

                    <Input placeholder="用户名" className="user" value={user} onChange={e => setUser(e.target.value)} />
                    <Input.Password placeholder="密码" className="pwd"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <div className="codeDiv">
                        <Input placeholder="验证码" className="code" value={pwd} onChange={e => setPwd(e.target.value)} />
                    </div>

                    <Button type="primary" className="login" onClick={() => login(user,pwd,123)} >
                        登录
                    </Button>

                </div>

            </div>



        </div>
    )
}
export default rts
