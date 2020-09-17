<template>
<div class="tree-list">
  <div class="tree">
  <div class="close" @click="treeClose"><Icon type="ios-close-circle-outline" size="30" /></div>
    <div class="tree-item">
      <Tree  ref="tree"  check-directly  :data="treeList" show-checkbox multiple></Tree>
    </div>
    <div class="btn">
      <HadnleBtn>
         <Button slot="left" style="width:100px" size='large' @click="cancel">取消</Button>
         <Button type="primary" style="width:100px" size='large' slot="center" @click="confirm">确认</Button>
      </HadnleBtn>
    </div>
  </div>
</div>
</template>

<script>
import HadnleBtn from '../../../components/HandleBtn'
export default {
  components:{
    HadnleBtn
  },
  props:{
    treeList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    cancel(){
      this.$emit('cancel')
    },
    confirm(){
      let selectedList = this.$refs.tree.getCheckedAndIndeterminateNodes()
      let str = ''
      // console.log(this.$refs.tree.getCheckedAndIndeterminateNodes());
      selectedList.forEach(item=>{
        str+=item.id+','
      })
      str = str.substring(0,str.length-1)
      // console.log(str)
      this.$emit('confirm',str)
    },
    treeClose(){
       this.$emit('treeClose')
    }
  }
}
</script>

<style lang="less" scoped>
.tree-list{
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 99999;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, .4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  box-sizing: border-box;
  .tree{
    position: relative;
    border-radius: 5px;
    height: 100%;
    padding: 20px 50px;
    overflow: auto;
    width: 60%;
    background: #fff;
    .close{
      position: absolute;
      right: 20px;
      top: 10px;
      cursor: pointer;
    }
    .btn{
      margin-top: 50px;
      margin-left: 200px;
      width: 240px;
    }
  }
}
</style>