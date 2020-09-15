
import request from './index'

export function getUsers(){
  return request({
    url:'/roles'
  })
}

export function getRights(){
  return request({
    url:'/rights/list',
    method:'get'
  })
}

export function addRoles(roles){
  return request({
    url:'/roles',
    method:'post',
    data:roles
  })
}