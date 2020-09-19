

import request from './index'

export function uresLb(wcnm) {
  return request({
    method: 'get',
    url: '/users',
      params:{
      query:wcnm,
      pagenum:1,
      pagesize:6
    }
  })
}
//添加
export function addusers(roles) {
  return request({
    method: 'post',
    url: '/users',
    data:roles
  })
}
//删除
export function removeUs(id) {
  return request({
    method: 'delete',
    url: `/users/${id}`,
  })
}
//分页
export function uresPag() {
  return request({
    method: 'get',
    url: '/users',
      params:{
      query:'',
      pagenum:1,
      pagesize:2
    }
  })
}
//编辑
export function redact(id,roles,) {
  return request({
    method: 'put',
    url: `/users/${id}`,
    data:roles
  })
}

//分配
export function Setuser(id) {
  return request({
    method: 'put',
    url: `/users/${id}/role`,
  })
}
