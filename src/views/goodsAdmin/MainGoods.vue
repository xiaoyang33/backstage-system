<template>
  <div>
    <div class="search">
      <Input search v-model="con" @on-search="handleQuery" size="large" style="width:360px;margin-right:50px" enter-button placeholder="请输入搜索内容" />
      <Button type="primary" size="large" to="/home/goods/addgoods" >添加商品</Button>
    </div>
    <GoodsList :goods-list="goodsList"/>
     <Page :total="total"  @on-change="pageChange" :page-size="pagesize" @on-page-size-change="siezChange" show-elevator show-total show-sizer style="margin:30px 0 50px"/>
  </div>
</template>

<script>
import {getGoods} from '../../network/goodsAdmin'

import GoodsList from './childCpns/GoodsList'
export default {
  components:{
    GoodsList
  },
  data(){
    return {
      goodsList:[],
      total:0,
      pagesize:10,
      page:1,
      con:''
    }
  },
  methods:{
    // 页码改变回调
    pageChange(index){
      // console.log(index);
      this.page = index
      this.getGoodsF()
    },
    // 页容量改变 回调
    siezChange(size){
       this.page = 1
      this.pagesize = size
      this.getGoodsF()
    },
    // 获取数据函数
    getGoodsF(){
      getGoods(this.pagesize,this.page,this.con).then(res=>{
        console.log(res);
        if(res.data.meta.status == 200){
          this.total = res.data.data.total
          this.goodsList = res.data.data.goods
          this.$Message.success(res.data.meta.msg)
        }
      })
    },
    // 查询商品
    handleQuery(){
      this.page = 1
      // console.log(this.con);
      this.getGoodsF()
    }
  },
  created(){
    this.getGoodsF()
  }
}
</script>

<style lang="less" scoped>
.search{
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
</style>