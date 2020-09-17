
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

export function delRoles(id){
  return request({
    url:'/roles/'+id,
    method:'delete'
  })
}

export function compile(id,roles){
  return request({
    url:'/roles/'+id,
    method:'put',
    data:roles
  })
}

export function getTreeRights(){
  return request({
    url:'/rights/tree',
    method:'get'
  })

}
export function RolesAuth(roleId,idList){
  return request({
    url:`roles/${roleId}/rights`,
    method:'post',
    data:{
      rids:idList
    }
  })
}
export function  deleteRights(roleId,rightId) {
  
  return request({
    url:`roles/${roleId}/rights/${rightId}`,
    method:'delete',
  })
}