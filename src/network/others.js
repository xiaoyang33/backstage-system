import request from './index'




export function Login(info) {
  return request({
    method: 'post',
    data: info,
    url: '/login'
  })
}

export function getSider() {
  return request({
    url: 'menus'
  })
}