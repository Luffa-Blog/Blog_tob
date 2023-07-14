import rq from "../utils/axios/index"
import { message } from "antd"

//  文章查询  这里没有深究返回的类型，有兴趣的同学可以在axios文件里面去定义返回的类型
const articelSelect = (title: string, date: string, id: string | undefined | number = undefined): Promise<any> => {
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
interface DataType {

    title: string;
    content: string;
    createDate: string;
    class: string;
    img: string;
}

// 文章修改
const articelUpdate = (data: DataType, id: number): Promise<any> => {
    return rq({
        url: "/api/articel/update",
        method: "post",
        param: {
            newdata: data,
            id: id

        },
        onerror: () => {
            message.error("请求错误")
        },
    }
)}

// 文章修改
const articeladd= (data: DataType): Promise<any> => {
    return rq({
        url: "/api/articel/add",
        method: "post",
        param: {
            newdata: data,
        },
        onerror: () => {
            message.error("请求错误")
        },
    }
    )
}

// 文章删除
const articeldel= (id: number): Promise<any> => {
    return rq({
        url: "/api/articel/remove",
        method: "post",
        param: {
            id: id,
        },
        onerror: () => {
            message.error("请求错误")
        },
    }
    )
}



export { articelSelect, articelUpdate, articeladd, articeldel }