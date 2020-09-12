<template>
  <div class="login">
    <div class="login-item">
      <Input
        v-model="info.username"
        clearable
        placeholder="请输入账号"
        style="width: 400px"
        prefix="ios-contact"
        size="large"
      />
      <Input
        v-model="info.password"
        type="password"
        password
        placeholder="请输入密码"
        size="large"
        style="width: 400px;margin-top:30px"
        prefix="md-lock"
      />
      <div class="btn">
        <Button type="primary" style="width:100px" :loading="isLoading" @click="login">登录</Button>
        <Button style="width:100px"  @click="clear">重置</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "../network/others";
export default {
  data() {
    return {
      info: {
        username: "admin",
        password: "123456",
      },
      isLoading:false
    };
  },
  methods: {
    login() {
      this.isLoading = true
      setTimeout(()=>{
        Login(this.info).then((res) => {
        console.log(res);
        this.isLoading = false
        this.test(res.data.meta)
        this.$store.commit('setToken',res.data.data.token)
        localStorage.setItem('token',res.data.data.token)
        this.$router.push('/home')
      });
      },1000)
    },
    clear() {
      this.info.username = "";
      this.info.password = "";
    },
    test(options) {
      if (options.status === 400) {
        this.$Message.warning(options.msg);
      } else {
        this.$Message.success("登录成功");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: #008c8c;
  .login-item {
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 90px 90px 60px;
    border-radius: 5px;
    .btn {
      margin-top: 20px;
      width: 100%;
      text-align: right;
      button {
        &:first-child {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>