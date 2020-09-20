import request from './index'

export function orders() {
    return request({
        method:'get',
        url: '/orders',
        params:{
            query:'',
            pagenum:1,
            pagesize:7,
        },
    })
  }
  
  export function amend(id){
      return request({
          method:'',
          url:`orders/${id}`
      })
  }
  //物流信息
  export function office(){
    return request({
        method:'get',
        url:'/kuaidi/1106975712662'
    })
}

export function Orders(pagesize,pagenum,query) {
    return request({
        method:'get',
        url: '/orders',
        params:{
            query,
            pagenum,
            pagesize,
        }
    })
  }