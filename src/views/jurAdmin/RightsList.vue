<template>
  <div>
    <Table border stripe :columns="columns1" :data="rightsList">
      <template slot-scope="{row}" slot="action">
        <Tag color="blue" size="large" v-if="row.level == 0">一级</Tag>
        <Tag color="green" size="large" v-else-if="row.level==1">二级</Tag>
        <Tag color="volcano" size="large" v-else>三级</Tag>
      </template>
    </Table>
  </div>
</template>

<script>
import { getRights } from "../../network/jurAdmin";
export default {
  data() {
    return {
      columns1: [
        {
          title: "#",
          type: "index",
          width: 60,
        },
        {
          title: "权限名称",
          key: "authName",
        },
        {
          title: "路径",
          key: "path",
        },
        {
          title: "权限等级",
          key: "level",
          slot: "action",
        },
      ],
      rightsList: [],
    };
  },
  created() {
    getRights().then((res) => {
      console.log(res);
      this.rightsList = res.data.data;
    });
  },
};
</script>

<style>
</style>