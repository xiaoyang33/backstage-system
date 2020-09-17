<template>
  <div>
    <Modal title="修改用户" v-model="mmk"  @on-ok="redactL"  class-name="vertical-center-modal">
      <div  class="ipt">
        <div class="ipt-item">
          <span><span class="req">*</span> 用户名</span><Input  v-model="roles.username" disabled clearable style="width: 400px" />
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
import {redact} from '../../../network/userAdmin'
export default {
  data() {
    return {
      mmk:false,
        roles:{
        username:'',
        email:'',
        mobile:''
      }
    };
  },
  methods:{
    redactL(){
      redact(this.roles).then(res=>{
        console.log(res);
        console.log(email);
      this.roles.username = res.data.username
      this.roles.email= res.data.email
      this.roles.mobile= res.data.mobile
      })
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
