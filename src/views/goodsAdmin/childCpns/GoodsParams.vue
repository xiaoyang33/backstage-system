<template>
  <div>
    <Tag checkable 
     color="blue"
      v-for="(item,index) in valList" :key="index"
      style="cursor:pointer;margin:5px 10px"
      size="large"
      :name="item"
      :checked="false"
      @on-change="handleChange"
      >{{item}}</Tag>
  </div>
</template>

<script>
import {getParamsList} from '../../../network/goodsAdmin'
export default {
  data(){
    return {
      valList:[],
      selectList:[]
    }
  },
  methods:{
    formatP(val){
      let va = val.split(',')
      return va
    },
    handleChange(a,name){
      if(this.selectList.some(item=>name==item)){
        console.log(a);
        this.selectList.forEach((item,index)=>{
          if(item === name){
            this.selectList.splice(index,1)
          }
        })
      }else{
        this.selectList.push(name)
      }
      // console.log(this.selectList)
    }
  },
  mounted(){
    let id = this.$store.getters.getId
    console.log(id);
    getParamsList(id,'many').then(res=>{
      // console.log(res.data.data[0].attr_vals);
      this.valList = this.formatP(res.data.data[0].attr_vals)
      // console.log(this.valList);
    })
  },
  beforeDestroy(){
    this.$store.commit('setParamsList',this.selectList)
  }
}
</script>

<style>

</style>