<template>
<div>
<div class="t1">
    <div class="inp">
    <Input size="large" v-model="soso" search  placeholder="请输入内容"  enter-button  @on-search='ss'/>
    </div>
</div>
 <Table border :columns="columns1" :data="data1">
    <template slot-scope="{row}" slot="action">
        <!-- 修改地址 -->
        <Button type="primary"   @click="edit">
          <Icon type="ios-brush-outline" />
        </Button>
        <!-- 物流信息 -->
        <Button type="warning" style="margin:0px 0px 0px 10px"  @click="off">
          <Icon type="ios-settings-outline" />
        </Button>
        <!-- 查看详情 -->
        <Button type="success" style="margin:0px 10px" @click="parti">
          <Icon type="ios-settings-outline" @click="parti(row)" />
        </Button>
        <!-- 修改详情 -->
        <!-- <Button type="info"  >
          <Icon type="ios-settings-outline" />
        </Button> -->
      </template>
      <template  slot="butt">
          <Button type="error" ghost>未付款</Button>
      </template>
 </Table>
 

    <!-- 引入 -->
    <EditAddress ref="EditAddress" />
    <Office ref="Office" />
    <Particulars ref="Particulars" />
</div>
</template>
<script>
import {orders} from '../../../network/orderAdime'
import times from '../../../network/time'
import EditAddress from './EditAddress'
import Office from './Office'
import Particulars from './particulars'
export default {
    props: {

    },
     data () {
            return {
             
                columns1: [
                    {
                        title: '#',
                        type:'index',
                        // key: 'order_id',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '订单编号',
                        key: 'order_number',
                        align: 'center',

                    },
                    {
                        title: '订单价格',
                        key: 'order_price',
                        align: 'center',

                    },
                    {
                        title: '是否付款',
                        slot:'butt',
                        align: 'center',

                    },
                    {
                        title: '是否发货',
                        key: 'is_send',
                        align: 'center',

                    },
                    {
                        title: '下单时间',
                        key: 'create_time',            
                        align: 'center',
                    },
                    {
                        title: '操作',
                        slot: "action",
                        align: 'center',
                        width: 260
                        


                    }
                ],
                data1: [],  
                soso:''                  
            }
        },
     created(){
         orders().then((res)=>{

             console.log(res.data.data.goods);
             //时间戳转换
            for(let i=0;i<res.data.data.goods.length;i++){
                var date=new Date(res.data.data.goods[i].create_time);
                res.data.data.goods[i].create_time=times(date);
             }
             this.data1 = res.data.data.goods;


        })
    },
    methods: {
        //搜索
        ss(){
             orders(this.soso).then((res)=>{
                // console.log(res);
             this.data1 = res.data.data.goods;
        })

        },  
        //修改地址
        edit(){
            this.$refs.EditAddress.isShow = true
            },
        // 物流信息
        off(){
            this.$refs.Office.Office = true
        },
        //查看详情 
        parti(row){
            this.$refs.Particulars.Office = true
        }
    },
    
    components: {
        //注册
        EditAddress,
        Office,
        Particulars

    },
};
</script>



<style scoped lang="less">

.t1{
    margin: 20px 0px;
    overflow: hidden;
}
.inp{
    margin-right:30px;
    width: 450px;
}


</style>
