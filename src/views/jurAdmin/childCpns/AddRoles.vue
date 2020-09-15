<template>
  <div>
    <Modal title="添加用户" v-model="isShow"  @on-ok="makeSure"  class-name="vertical-center-modal">
      <div  class="ipt">
        <div class="ipt-item">
          <span><span class="req">*</span> 角色名称</span><Input v-model="roles.roleName" placeholder="请输入角色" clearable style="width: 400px" />
        </div>
        <div class="ipt-item">
          <span>角色描述</span><Input :autosize="{minRows: 2}" type="textarea" v-model="roles.roleDesc" placeholder="请输入描述"  style="width: 400px" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {addRoles} from '../../../network/jurAdmin'
export default {
  data() {
    return {
      isShow:false,
      roles:{
        roleName:'',
        roleDesc:''
      }
    };
  },
  methods:{
    makeSure(){
      // this.$Message.success('chenggong')
      addRoles(this.roles).then(res=>{
        console.log(res);
        if(res.data.meta.status == 201){
          this.$Message.success(res.data.meta.msg)
        }else{
          this.$Message.warning(res.data.meta.msg)
        }
      })
      this.roles.roleName = ''
      this.roles.roleDesc = ''
    }
  }
};
</script>
<style lang="less" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.ipt-item{
  margin: 20px 0;
  &>span{
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 10px;
    .req{
      color: #ff5777;
    }
  }
}
</style>