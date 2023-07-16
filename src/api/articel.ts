import axios from "axios";
import rq from "../utils/axios/index"
import { message } from "antd"

type ApiResult <T> = {
    code: number;
    msg?: string;
    data?: T;
}

//  文章查询  这里没有深究返回的类型，有兴趣的同学可以在axios文件里面去定义返回的类型
const articelSelect = (title: string, date: string, id?: string | undefined | number): Promise<ApiResult<DataType[]>> => {
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
    id:number
    title: string;
    content: string;
    createDate: string;
    class: string;
    img: string;
}

// 文章修改
const articelUpdate = (data: DataType, id: number): Promise<ApiResult<any>> => {
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
    )
}
// 添加文章

const articelAdd = (data: DataType): Promise<ApiResult<any>> => {
    return rq({
        url: "/api/articel/add",
        method: "post",
        param: {
            title: data.title,
            content: data.content,
            createDate: data.createDate,
            class: data.class,
            img: data.img,

        },
        onerror: () => {
            message.error("请求错误")
        },
    }
    )
}

// 删除文章
const articelDelete = (id: number): Promise<ApiResult<any>> => {
    return rq({
        url: "/api/articel/remove",
        method: "post",
        param: {
            id: id
        },
        onerror: () => {
            message.error("请求错误")
        },
    }
    )
}

export { articelSelect, articelUpdate, articelAdd, articelDelete }