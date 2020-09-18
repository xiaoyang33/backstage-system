<template>
  <div>
    <div class="btn">
      <Button type="primary" size="large" @click="addClick">添加分类</Button>
    </div>
    <AddCate ref="addcate" colName="分类名称" title="添加分类" @add="handleAdd" :cascader="cascader" />
    <AddCate ref="addcate1" colName="分类名称" title="编辑名称" @add="handleCompile" />
    <Table :loading="isLoading" border row-key="cat_id" :columns="columns16" :data="data12">
      <template slot-scope="{ row}" slot="isValid">
        <Icon type="ios-checkmark-circle" color="#41B883" size="22" v-if="!row.cat_deleted" />
        <Icon type="ios-close-circle" color="#ED4014" size="22" v-else />
      </template>
      <template slot-scope="{ row}" slot="sort">
        <Tag color="blue" size="large" v-if="row.cat_level == 0">一级</Tag>
        <Tag color="green" size="large" v-else-if="row.cat_level==1">二级</Tag>
        <Tag color="volcano" size="large" v-else>三级</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" style="margin-right: 5px; " @click="show(row)">
          <Icon type="ios-brush-outline" />编辑
        </Button>
        <Button type="error" @click="remove(row)">
          <Icon type="ios-trash-outline" />删除
        </Button>
      </template>
    </Table>
    <Page
      :total="total"
      @on-change="pageChange"
      :page-size-opts="[3,6,9]"
      :page-size="pagesize"
      @on-page-size-change="siezChange"
      show-elevator
      show-total
      show-sizer
      style="margin:30px 0 50px"
    />
  </div>
</template>

<script>
import {
  getCate,
  getCateAll,
  addCate,
  compCate,
  removeCate,
} from "../../network/goodsAdmin";

import AddCate from "./childCpns/AddCate";
export default {
  components: {
    AddCate,
  },
  data() {
    return {
      data12: [],
      columns16: [
        {
          title: "#",
          width: 60,
          type: "index",
          indexMethod: this.setIndex,
        },
        {
          title: "分类名称",
          key: "cat_name",
          // tooltip:true,
          tree: true,
        },
        {
          title: "是否有效",
          key: "cat_deleted",
          slot: "isValid",
        },
        {
          title: "排序",
          slot: "sort",
          key: "cat_level",
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center",
        },
      ],

      total: 0,
      pagesize: 3,
      page: 1,
      isLoading: false,
      isShow: false,
      cascader: [],

      compileId:null
    };
  },
  methods: {
    // 表格表头索引号
    setIndex(a) {
      // console.log(a);
      if (a.cat_level == 0) {
        return a._index + 1;
      }
    },
    // 页码函数
    pageChange(pagenum) {
      this.page = pagenum;
      this.get();
    },
    siezChange(size) {
      // console.log(size)
      this.page = 1;
      this.pagesize = size;
      this.get();
    },
    // 添加函数分类
    addClick() {
      this.$refs.addcate.isShow = true;
    },
    handleAdd(obj) {
      addCate(obj).then((res) => {
        console.log(res);
        if(res.data.meta.status == 201){
          this.$Message.success(res.data.meta.msg)
          this.get()
          this.getAll()
        }
      });
    },
    // 编辑处理函数
    handleCompile(obj){
      console.log(obj);
      compCate(this.compileId,obj.cat_name).then(res=>{
        console.log(res);
        if(res.data.meta.status == 200){
          this.$Message.success(res.data.meta.msg)
          this.get()
          this.getAll()
        }
      })
    },
    show(a) {
      console.log(a);
      this.compileId = a.cat_id
      this.$refs.addcate1.isShow = true;
    },
    // 修改和删除
    remove(row) {
      this.$Modal.confirm({
        title: "确认",
        content: "<p>确认删除</p>",
        onOk: () => {
          removeCate(row.cat_id).then((res) => {
            // console.log(res);
            if (res.data.meta.status == 200) {
              this.$Message.success(res.data.meta.msg);
              this.get();
              this.getAll()
            }
          });
        },
      });
      console.log(row);
    },
    format(val) {
      if (val === undefined) return [];
      let arr = [];
      val.forEach((item) => {
        let obj = {
          value: item.cat_name,
          label: item.cat_name,
          cat_pid: item.cat_pid,
          cat_name: item.cat_name,
          cat_level: item.cat_level,
          cat_id: item.cat_id,
          children: this.format(item.children),
        };
        arr.push(obj);
      });
      return arr;
    },
    get() {
      this.isLoading = true;
      getCate(this.pagesize, this.page).then((res) => {
        // console.log(res.data.data.result);
        this.data12 = res.data.data.result;
        this.total = res.data.data.total;
        this.isLoading = false;
      });
    },
    getAll() {
      getCateAll().then((res) => {
        // console.log(res.data.data);
        this.cascader = this.format(res.data.data);
        // console.log(this.cascader);
      });
    },
  },
  created() {
    this.get();
    this.getAll()
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-bottom: 15px;
}
</style>