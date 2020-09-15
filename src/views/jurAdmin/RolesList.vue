<template>
  <div>
    <div class="add">
      <Button type="primary" size="large" @click="btnClick" class="btn">添加角色</Button>
    </div>
    <Table class="tab" stripe border row-key="index" :columns="columns" :data="roleList">
      <template slot-scope="{index}" slot="action">
        <Button type="primary" style="margin-right: 5px" @click="show(index)">
          <Icon type="ios-brush-outline" />编辑
        </Button>
        <Button style="margin:0 20px" type="error" @click="remove(index)">
          <Icon type="ios-trash-outline" />删除
        </Button>
        <Button type="warning">
          <Icon type="ios-settings-outline" />分配权限
        </Button>
      </template>
    </Table>
    <AddRoles ref="Addroles" />
  
  </div>
</template>

<script>
import { getUsers } from "../../network/jurAdmin";
import AddRoles from './childCpns/AddRoles'
export default {
  // provide / inject
  components:{
    AddRoles
  },
  data() {
    return {
      columns: [
        {
          title: "#",
          width: 60,
          type: "index",
        },
        {
          title: "角色名称",
          key: "roleName" || 'authName',
          tree: true,
          render: (h, params) => {
            // console.log(params);
            return h("span", [
              h(
                "span",
                {
                  key: "authName",
                },
                params.row.roleName
              ),
            ]);
          },
        },
        {
          title: "角色描述",
          key: "roleDesc",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      roleList: [],
    };
  },
  methods:{
    btnClick(){
      // console.log(this.$refs.Addroles);
      this.$refs.Addroles.isShow = true
    }
  },
  created() {
    getUsers().then((res) => {
      console.log(res.data.data);
      this.roleList = res.data.data;
    });
  },
};
</script>

<style lang="less">
.btn {
  width: 160px;
  margin-bottom: 20px;
}
.titlelist {
  display: flex;
  height: 38px;
  line-height: 38px;
  width: 100%;
}
.titlelist li {
  margin: 0 10px;
  border-right: 1px solid #ccc;
  text-align: center;
  &:first-child{
    width: 60px;
  }
  &:nth-child(2){
    text-align: left;
    width: 60px;
  }
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5){
    flex: 1;
  }
  &:last-child{
    border: none;
  }
}
</style>