import rq from "../utils/axios/index"
import { message } from "antd"

// 这里没有深究返回的类型，有兴趣的同学可以在axios文件里面去定义返回的类型
const articelSelect = (title: string, date: string, id:string|undefined|number = undefined): Promise<any> => {
    return rq({
        url: "/api/articel/select",
        method: "post",
        param: {
            title: title,
            createDate: date,
            id: id

        },
        onerror: () => {
            message.error("请求错误")
        },
    })
};



export { articelSelect }