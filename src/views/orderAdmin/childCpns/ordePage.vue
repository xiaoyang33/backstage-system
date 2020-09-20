         <!-- 分页器 -->
<template>
<div class="pag">
 <Page :total="total" 
    @on-change="pageChange"
    :page-size="pagesize"
    @on-page-size-change="siezChange"
    show-elevator show-total show-sizer />
</div>
</template>

<script>
import {Orders} from '../../../network/orderAdime'
export default {
    props: {

    },
    data() {
        return {
            list:[],
            total:0,
            page:1,  //当前页码
            pagesize:7, //展示条数
        };
    },
     created(){
         Orders().then((res)=>{
          // this.total = res.data.data.total
          console.log( this.total);
          this.list = res.data.data
        })
            },
    


    methods: {

       // 页码改变回调
    pageChange(index){
      console.log(index);
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

      Orders(this.pagesize,this.page).then(res=>{
        console.log(res);
        // console.log(this.pagesize,this.page);
        if(res.data.meta.status == 200){
          this.total = res.data.data.total
          this.list = res.data.data
          // console.log(this.list);
        }
      })
    },


    },
    components: {

    },
};
</script>

<style scoped lang="less">
.pag{
    margin: 20px 0px;
}

</style>
