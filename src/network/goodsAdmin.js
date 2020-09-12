
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