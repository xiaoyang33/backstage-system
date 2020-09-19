<template>
    <div>
     <Modal title="物流信息"  v-model="Office"   class-name="vertical-center-modal">
       <Timeline  v-for="item in list" :key="item.index">
         <TimelineItem >
            <p class="time">{{item.context}}</p>
            <p class="content">{{item.ftime}} </p>
        </TimelineItem>
     </Timeline>
        </Modal>

    </div>
</template>

<script>
import {office} from '../../../network/orderAdime'
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
        office().then((res)=>{
            console.log(res.data.data);
            this.list = res.data.data
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
