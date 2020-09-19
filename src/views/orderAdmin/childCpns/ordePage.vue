<template>
    <div class="pag">
     <Page  :total="total"
      @on-change="pageChange"
      :page-size-opts="[3,6,9]"
      :page-size="pagesize"
      @on-page-size-change="siezChange"
      show-elevator
      show-total
      show-sizer/>
     
    </div>
</template>

<script>
import {orders} from '../../../network/orderAdime'
export default {
    props: {

    },
    data() {
    return {
      total: 0,
      pagesize: 3,
      page: 1,
        };
    },
    created(){
        orders().then((res)=>{
            console.log(res.data.data.total);
            
        })

    },

    methods: {
    pageChange(pagenum) {
      this.page = pagenum;
      this.get();
    },
    siezChange(size) {
      this.page = 1;
      this.pagesize = size;
      this.get();
    },
    get() {
      this.isLoading = true;
      orders(this.pagesize, this.page).then((res) => {
        // console.log(res.data.data.result);
        this.data12 = res.data.data.result;
        this.total = res.data.data.total;
        this.isLoading = false;
      });
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
