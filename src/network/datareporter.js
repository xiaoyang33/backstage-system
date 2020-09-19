// 折线请求
import request from './index'
export function DataRe(){
    return request({
        url:'/reports/type/1',
        method:'get'

    })
        
}