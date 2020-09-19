


export default {
  getId(state){
    let a = state.fromInfo.goods_cat.split(',')
    
    return a[a.length-1]

  }
}