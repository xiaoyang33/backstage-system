
import axios from 'axios'

export default function (options) {

  const request = axios.create({
    baseURL: 'http://192.168.1.8:8888/api/private/v1/',
    timeout: 5000
  })

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
