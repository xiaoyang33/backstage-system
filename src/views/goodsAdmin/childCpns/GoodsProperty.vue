<template>
  <div>
    <div class="form-item" v-for="item in list " :key="item.attr_id">
      <div>
        <span> {{item.attr_name}}</span>
      </div>
      <Input  placeholder="" width="100%" />
    </div>
  </div>
</template>

<script>
import {getParamsList} from '../../../network/goodsAdmin'
export default {
    data(){
      return {
        list:[]
      }
    },
    mounted(){
      let id = this.$store.getters.getId
      console.log(id);
      getParamsList(id,'only').then(res=>{
        console.log(res);
        this.list = res.data.data
      })
    }
}
</script>

<style lang="less" scoped>
.form-item{
  div{
    margin-bottom: 15px;
    width: 100%;
  }
}

</style>