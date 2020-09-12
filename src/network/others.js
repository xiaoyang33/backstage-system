import request from './index'




export function Login (info){

  return request({
    method:'post',
    data:info,
    url:'/login'
  })

}