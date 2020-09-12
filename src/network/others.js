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
    url: 'menus',
    headers:{
      Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1OTk4OTU2ODgsImV4cCI6MTU5OTk4MjA4OH0.FWYJEl_8F4feybNez-YIFIdemJJogOzwpVooFuMzXkc'
    }
  })
}