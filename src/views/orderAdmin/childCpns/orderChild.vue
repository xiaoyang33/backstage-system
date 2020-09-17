<template>
<div>
<div class="t1">
    <div class="inp">
    <Input size="large" v-model="soso" search  placeholder="请输入内容"  enter-button  @on-search='ss'/>
    </div>
</div>
 <Table border :columns="columns1" :data="data1">
    <template slot-scope="{index,row}" slot="action">
        <Button type="primary" style="margin:0 10px"  @click="show(index,row.id)">
          <Icon type="ios-brush-outline" />
        </Button>
        <Button type="warning">
          <Icon type="ios-settings-outline" />
        </Button>
      </template>
      <template  slot="butt">
          <Button type="error" ghost>未付款</Button>
      </template>
 </Table>
    
</div>
</template>
<script>
import {orders} from '../../../network/orderAdime'
import times from '../../../network/time'
export default {
    props: {

    },
     data () {
            return {
             
                columns1: [
                    {
                        title: '#',
                        key: 'order_id',
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

                    }
                ],
                data1: [],  
                soso:''                  
            }
        },
     created(){
         orders().then((res)=>{
            
             console.log(res.data.data.goods);
                  for(let i=0;i<res.data.data.goods.length;i++){
                var date=new Date(res.data.data.goods[i].create_time);
                res.data.data.goods[i].create_time=times(date);
             }
            this.data1 = res.data.data.goods;

        
            
        })
    },
    methods: {
        ss(){
            orders(this.soso).then((res)=>{
                // console.log(res);
            this.data1 = res.data.data.goods;
        })

        }       
    },

    components: {

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
