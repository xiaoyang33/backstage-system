
import axios from 'axios'

export default function (options) {

  const request = axios.create({
    baseURL: 'http://192.168.1.13:8888/api/private/v1/',
    timeout: 5000
  })

    // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token')
    if(token){
      config.headers.Authorization = token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  return request(options)

}

//请求格式
/*
  import request from './index'

  export function get(){
    return request({
      url:'/login',
      data:{
        username:'admin',
        password:123456
      }
    })
  }
*/
