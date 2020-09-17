import request from './index'

export function orders() {
    return request({
        method:'get',
        url: '/orders',
        params:{
            query:'',
            pagenum:1,
            pagesize:6,
        }
    })
  }
  
  export function amend(id){
      return request({
          method:'',
          url:`orders/${id}`
      })
  }