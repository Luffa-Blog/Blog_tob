import rq from "../utils/axios/index"
import {message} from "antd"




// 这里没有深究返回的类型，有兴趣的同学可以在axios文件里面去定义返回的类型
const login = (user: string, pwd: string, qrcode: string, watch: boolean): Promise<any> => {
    return rq({
        url: "/api/admin/login",
        method: "post",
        param: {
            username: user,
            pwd: pwd,
            rember: watch ? 7 : 1,
            qrcode: qrcode,
        },
        onerror: () => {
            message.error("请求错误")
         },
    })
};

const obtainQRCodeImg = 123

export { login, obtainQRCodeImg }