import axios from "axios";
import {useRoute} from "vue-router";

const route = useRoute();
// Set config defaults when creating the instance
const myAxios = axios.create({
    baseURL:"/app"
});

myAxios.defaults.withCredentials = true;




// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //未登录就跳转到登录页
    if(response?.data?.code === 40100 || response?.data?.code === 40101){
        const redirectUrl = window.location.href.split("http://localhost:8082/")[1];
        window.location.href = `/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
