<template>
  <div>
    <Modal title="添加分类" v-model="isShow" @on-ok="makeSure" class-name="vertical-center-modal">
      <div class="ipt">
        <div class="ipt-item">
          <span>
            <span class="req">*</span> 分类名称
          </span>
          <Input v-model="roles.roleName" placeholder="请输入分类名称" clearable style="width: 400px" />
        </div>
        <div class="ipt-item">
          <span>父级分类</span>
          <Input
            :autosize="{minRows: 2}"
            type="textarea"
            v-model="roles.roleDesc"
            placeholder="请输入描述"
            style="width: 400px"
          />
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
      isShow: false,
      roles: {
        roleName: "",
        roleDesc: "",
      },
    };
  },
  watch: {
    compile() {
      // console.log(this.compile);
      this.roles.roleName = this.compile.name
      this.roles.roleDesc = this.compile.desc
    },
  },
  methods: {
    makeSure() {
      this.$emit("addsucc", this.roles);
      this.roles.roleName = "";
      this.roles.roleDesc = "";
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
.ipt-item {
  margin: 20px 0;
  & > span {
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 10px;
    .req {
      color: #ff5777;
    }
  }
}
</style>