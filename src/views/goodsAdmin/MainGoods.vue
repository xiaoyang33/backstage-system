<template>
  <div>
    <div class="search">
      <Input search v-model="con" @on-search="handleQuery" size="large" style="width:360px;margin-right:50px" enter-button placeholder="请输入搜索内容" />
      <Button type="primary" size="large" to="/home/goods/addgoods" >添加商品</Button>
    </div>
    <GoodsList :goods-list="goodsList" @compile="handleCompile" @remove="handleRemove"/>
    <Page :total="total"  @on-change="pageChange" :page-size="pagesize" @on-page-size-change="siezChange" show-elevator show-total show-sizer style="margin:30px 0 50px"/>
    <AddCate title="编辑商品" @add="handleAdd" colName="商品名称" ref="cate1"/>
  </div>
</template>

<script>
import {getGoods,deleteGoods,compileGoods} from '../../network/goodsAdmin'

import GoodsList from './childCpns/GoodsList'
import AddCate from './childCpns/AddCate'
export default {
  components:{
    GoodsList,
    AddCate
  },
  data(){
    return {
      goodsList:[],
      total:0,
      pagesize:10,
      page:1,
      con:'',
      goodsId:null
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
        }
      })
    },
    // 编辑商品
    handleCompile(e){
      console.log(e);
      this.goodsId  = e
      this.$refs.cate1.isShow = true
    },
    handleAdd(a,b){
      console.log(b);
      compileGoods(this.goodsId,b).then(res=>{
        console.log(res);
      })
    },
    // 删除商品
    handleRemove(id){
      deleteGoods(id).then(res=>{
        console.log(res);
         this.$Modal.confirm({
        title: "确认",
        content: "<p>确认删除</p>",
        onOk: () => {
          deleteGoods(id).then((res) => {
            if (res.data.meta.status == 200) {
              this.$Message.success(res.data.meta.msg);
             this.getGoodsF()
            }
          });
        },
      });
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