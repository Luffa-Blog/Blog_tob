


import axios from "axios";
import config from "./config";


const message = {
    error: function (txt: string) {

    }
};
const AJAX_TIMEOUT = "ECONNABORTED";

let ROOT_URL = "";
if (process.env.NODE_ENV === "development") {
    ROOT_URL = config.development;
} else {
    ROOT_URL = config.product;
}

const newRequest = (url: string, params: any, method: string, onError: any) =>
    new Promise((resolve, reject) => {



        let postData = {};


        let turl = ROOT_URL + url;
        postData = {
            url: turl,
            method,
            timeout: 60000,
            withCredentials: false,
            headers: {
                "Authorization": "Bearer "+localStorage.token,
            },
            ...params
        };


        axios(postData)
            .then((res: any) => {

                const { code, msg, user } = res.data;

                if (code == 601) {
                    localStorage.user = "";
                    localStorage.token = ""
                    window.location.href = "/"

                }


                if (code == 200 && user == null) {


                } else if (code == 601) {
                    localStorage.token = ""

                }

                resolve(res.data);
            })
            .catch(error => {
                onError && onError(error);

            });
    });
const request = ({ url = "", param = {}, method = "get", onerror = {} }) => {




    const Method = method.toLowerCase();
    if (Method === "post") {
        return newRequest(url, { data: param }, "post", onerror);
    }
    if (Method === "put") {
        return newRequest(url, { data: param }, "put", onerror,);
    }
    if (Method === "delete") {
        return newRequest(url, { params: param }, "delete", onerror,);
    }
    return newRequest(url, { params: param }, "get", onerror,); // 默认 Get 请求
};

request.get = (url: string, param: any, onerror: any) =>
    request({ method: "get", url, param, onerror });
request.post = (url: string, param: any, onerror: any) =>
    request({ method: "post", url, param, onerror });
request.put = (url: string, param: any, onerror: any) =>
    request({ method: "put", url, param, onerror });
request.delete = (url: string, param: any, onerror: any) =>
    request({ method: "delete", url, param, onerror });

export default request;