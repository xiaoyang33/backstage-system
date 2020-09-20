<template>
    <div>
     <Modal title="订单详情"  v-model="Office"   class-name="vertical-center-modal">
            <div v-for="item in list" :key="item.order_id">
                <span>快递单号{{item.order_number}}</span>
            </div>
    </Modal>

    </div>
</template>

<script>
import times from '../../../network/time'
import {orders} from '../../../network/orderAdime'
export default {
    props: {

    },
    data() {
        return {
            list:[],
            Office:false
        };
    },
    created(){
        orders().then((res)=>{
            console.log(res.data.data);
                 //时间戳转换
            for(let i=0;i<res.data.data.goods.length;i++){
                var date=new Date(res.data.data.goods[i].create_time);
                res.data.data.goods[i].create_time=times(date);
             }
             this.list = res.data.data.goods;
        })

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

</style>
