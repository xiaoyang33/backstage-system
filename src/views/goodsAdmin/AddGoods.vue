<template>
  <div>
    <div class="tips">
      <Icon color="#999" style="margin-right:10px" size="22" type="md-alert" />  添加商品信息
    </div>
    <Steps :current="currentIndex" style="width:1050px;margin:0 auto">
        <Step title="步骤一" content="基本信息"></Step>
        <Step title="步骤二" content="商品参数"></Step>
        <Step title="步骤三" content="商品属性"></Step>
        <Step title="步骤四" content="商品图片"></Step>
        <Step title="步骤五" content="商品内容"></Step>
    </Steps>
    <div class="step-colum">
      <ul>
        <li @click="itemClick(index)" :class="{active:currentIndex === index}" v-for="(item,index) in nameList " :key="index">
          {{item}}
        </li>
      </ul>
      <div>
        <BasicInfo v-if="currentIndex == 0"/>
        <GoodsParams v-if="currentIndex == 1" />
        <GoodsProperty  v-if="currentIndex == 2" />
        <UpLoadImg  v-if="currentIndex == 3" />
        <GoodsContent 
        style='height:300px;'
        v-model='wangValue'
        @input="handleInput"
        v-if="currentIndex == 4"/>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInfo from './childCpns/BasicInfo'
import GoodsParams from './childCpns/GoodsParams'
import GoodsProperty from './childCpns/GoodsProperty'
import UpLoadImg from './childCpns/UpLoadImg'
import GoodsContent from './childCpns/GoodsContent'
export default {
  components:{
    BasicInfo,
    GoodsParams,
    GoodsProperty,
    UpLoadImg,
    GoodsContent
  },
  data(){
    return {
      nameList:['基本信息','商品参数','商品属性','商品图片','商品内容'],
      currentIndex:0,
      wangValue:''
    }
  },
  methods:{
    handleInput(a){
      let reg = /<[^>]+>/gim;
      let reg2 = /^\&/g
      let reg3 = /\&nbsp;/g
      a = a.replace(reg,'').replace(reg2,'').replace(reg3,'')
      console.log(a);
    },
    itemClick(index){
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.tips{
  background: #eee;
  // height: 20px;
  border-radius: 4px;
  color: #999;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.step-colum{
  display: flex;
  margin-top: 20px;
  width: 100%;
  ul{
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 20px;
    li{
      padding: 10px 20px;
      border-right:3px solid #ccc ;
      cursor: pointer;
      &:hover{
        color: #2D8CF0;
      }
      &.active{
        color: #2D8CF0;
        border-color: #2D8CF0;
      }
    }
  }
  &>div{
    width: 100%;
    padding: 10px 0 30px 0;
  }
}
</style>