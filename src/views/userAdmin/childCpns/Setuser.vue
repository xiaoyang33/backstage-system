<template>
  <div>
    <Modal title="修改用户" v-model="isShow"   @on-ok="makeSure" class-name="vertical-center-modal">
      <div  class="ipt">
        <div class="ipt-item">
          <span><span class="req">*</span> 用户名</span><Input  v-model="roles.username" disabled clearable style="width: 400px" />
        </div>
        <div class="ipt-item">
          <span><span class="req">*</span>邮箱</span><Input  v-model="roles.role_name" type="email" email disabled clearable style="width: 400px" />
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



export default {
  props:{
      
    compile:{}

  },
  data() {
    return {
                    cityList: [
                {
                    label: '主管'
                },
                {
                    label: '测试1'
                },
                  {
                    label: '测试2'
                },
            ],
            model8: '',
      isShow:false,
        roles:{
        username:'',
        role_name:'',
      }
    };
  },
 watch: {
    compile() {
      this.roles.username = this.compile.username
      this.roles.role_name = this.compile.role_name
    },
  },
  methods: {
    makeSure() {
      this.$emit(this.roles);
      this.roles.username = "";
      this.roles.role_name = "";
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
