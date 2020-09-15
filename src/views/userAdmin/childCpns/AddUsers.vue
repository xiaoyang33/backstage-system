<template>
  <div>
    <Modal title="添加用户" v-model="isShow"  @on-ok="makeSure"  class-name="vertical-center-modal">
      <div  class="ipt">
        <div class="ipt-item">
          <span><span class="req">*</span> 用户名</span><Input  v-model="roles.username"  clearable style="width: 400px" />
        </div>
        <div class="ipt-item">
          <span><span class="req">*</span> 密码</span><Input v-model="roles.password" clearable style="width: 400px" />
        </div>
        <div class="ipt-item">
          <span><span class="req">*</span>邮箱</span><Input  v-model="roles.email" type="email" email clearable style="width: 400px" />
        </div>
        <div class="ipt-item">
          <span><span class="req">*</span>手机号</span><Input  maxlength="11" v-model="roles.mobile"   clearable style="width: 400px" />
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import {addusers} from '../../../network/userAdmin'
export default {
  data() {
    return {
      isShow:false,
      roles:{
        username:'',
        password:'',
        email:'',
        mobile:''
      }
    };
  },
  methods:{
    makeSure(){
      addusers(this.roles).then(res=>{
        console.log(res);
        if(res.data.meta.status == 201){
          this.$Message.success(res.data.meta.msg)
        }else{
          this.$Message.warning(res.data.meta.msg)
        }
      })
      this.roles.username = ''
      this.roles.password = ''
      this.roles.email= ''
      this.roles.mobile=''
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