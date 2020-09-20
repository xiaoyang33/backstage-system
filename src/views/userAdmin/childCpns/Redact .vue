<template>
  <div>
    <Modal title="修改用户" v-model="isShow"   @on-ok="makeSure" class-name="vertical-center-modal">
      <div  class="ipt">
        <div class="ipt-item">
          <span><span class="req">*</span> 用户名ID</span><Input  v-model="roles.id" disabled clearable style="width: 400px" />
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



export default {
  props:{
    compile:{}

  },
  data() {
    return {
      isShow:false,
        roles:{
        id:'',
        email:'',
        mobile:''
      }
    };
  },
 watch: {
    compile() {
    
      this.roles.id = this.compile.id
      this.roles.email = this.compile.email
      this.roles.mobile = this.compile.mobile
    },
  },
  methods: {
    makeSure() {
      this.$emit("addsucc", this.roles);
      this.roles.id = "";
      this.roles.email = "";
      this.roles.mobile = "";
    },
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
