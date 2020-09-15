<template>
    <div>
    <Modal title="分配角色" v-model="SZ"  @on-ok="Setuser"  class-name="vertical-center-modal">
      <div  class="ipt">
        <div class="ipt-item">
          <span> 当前的用户</span> 
        </div>
        <div class="ipt-item">
          <span>当前的角色</span>
        </div>
        <div class="ipt-item">
          <span>分配新角色</span> <Select v-model="model8" clearable style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
        </div>
      </div>
    </Modal>
    </div>
</template>

<script>
import {Setuser} from '../../../network/userAdmin'
export default {
    props: {

    },
    data() {
        return {
             cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model8: ''
        };
    },
 
    methods: {
        Setuser()
    },
    components: {
        Setuser
    },
};
</script>

<style scoped lang="less">

</style>
