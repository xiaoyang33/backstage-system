
import request from './index'




/*            商品列表                  */
export function getGoods(pagesize,pagenum,query){
  return request({
    url:'/goods',
    method:'get',
    params:{
      query,
      pagesize,
      pagenum,
    }
  })
}
/*            分类参数                     */
// 获取参数列表
export function getParamsList(id,sel){
  return request({
    url:`/categories/${id}/attributes`,
    method:'get',
    params:{
      sel,
    }
  })
}

// 添加动态参数或静态属性
export function addtParams(id,attr_name,attr_sel,attr_vals){
  return request({
    url:`/categories/${id}/attributes`,
    method:'post',
    data:{
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}
// 编辑提交参数
export function compilerParams(id,attrId,attr_name,attr_sel,attr_vals){
  return request({
    url:`/categories/${id}/attributes/${attrId}`,
    method:'put',
    data:{
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}
// 删除参数
export function deleParams(id,attrid){
  return request({
    url:`categories/${id}/attributes/${attrid}`,
    method:'delete'
  })
}

/*           商品分类请求                  */

export function getCate(pagesize,pagenum) {
  return request({
    url:'/categories',
    method:'get',
    params:{
      pagesize,
      pagenum
    }
  })
}
/* 获取所有分类 */
export function getCateAll() {
  return request({
    url:'/categories',
    method:'get',
  })
}
/* 添加分类 */
export function addCate(obj){
  return request({
    url:'/categories',
    method:'post',
    data:{
      cat_pid:obj.cat_pid,
      cat_level:obj.cat_level,
      cat_name:obj.cat_name,
    }
  })
}
/* 编辑提交分类 */

export function compCate(id,cat_name){
  return request({
    url:`/categories/${id}`,
    method:'put',
    data:{
      cat_name
    }
  })
}

/* 删除分类 */
export function removeCate(id){
  return request({
    url:`/categories/${id}`,
    method:'delete',
  })
}
