<template>
  <div class="box">
    <p class="notice">
      <Icon color="#FF9900" style="margin-right:10px" size="22" type="md-alert" />注意：只允许为第三级分类设置相关参数!
    </p>
    <div class="selCate">
      <span>请选择商品分类：</span>
      <Cascader
        @on-change="fin"
        @on-visible-change="fin1"
        style="width:250px;z-index:999"
        :data="cascader"
        change-on-select
        trigger="hover"
      ></Cascader>
    </div>
    <Menu mode="horizontal" @on-select="select" active-name="1">
      <MenuItem name="1">
        <Icon type="logo-codepen" />动态参数
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-cube" />静态参数
      </MenuItem>
    </Menu>
    <div class="addbtn">
      <Button type="primary" style="width:100px" @click="addclick">添加参数</Button>
    </div>
    <AddCate ref="addCate1" @add="handleAddpar" colName="动态参数" title="添加动态参数" />
    <AddCate ref="addCate2" @add="handleAddnam" colName="编辑名称" title="编辑参数" />
    <ul class="treelist">
      <li>
        <ul class="list-item">
          <li></li>
          <li>&nbsp;#</li>
          <li>参数名称</li>
          <li>操作</li>
        </ul>
      </li>
      <li v-for="(item,index)  in paramsList " :key="item.id">
        <ul class="list-item">
          <li @click="openlist(index)">
            <Icon :class="[ is(index) ? 'open' : 'close']" type="ios-arrow-down"></Icon>
          </li>
          <li>{{index+1}}</li>
          <li>{{item.attr_name}}</li>
          <li>
            <HandleBtn>
              <Button slot="left" type="primary" style="margin-right: 5px" @click="compile(item)">
                <Icon type="ios-brush-outline" />编辑
              </Button>
              <Button slot="center" type="error" @click="remove(item)">
                <Icon type="ios-trash-outline" />删除
              </Button>
            </HandleBtn>
          </li>
        </ul>
        <transition name="fade">
          <div v-if="is(index)" class="container-tag">
              <div v-if="item.attr_vals!=''">
                <Tag size="large" style="margin:5px 5px" v-for="ite in formatP(item.attr_vals)" :key="ite.cat_id" color="blue" closable>{{ite}}</Tag>
              </div>
              <div>
                <Tag v-if="isIpt" size="large" @on-change="tagClick" checkable color="default" style="background:#fff;cursor:pointer">+ New Tag</Tag>
                <Input v-else focus @on-enter="inpSure" v-model="iptValue"  style="width: 100px" />
              </div>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getCateAll,
  getParamsList,
  addtParams,
  deleParams,
  compilerParams,
} from "../../network/goodsAdmin";
import HandleBtn from "../../components/HandleBtn";
import AddCate from "./childCpns/AddCate";
import Axios from "axios";
export default {
  components: {
    AddCate,
    HandleBtn,
  },
  data() {
    return {
      cascader: [],
      paramsList: [],
      currentIndex: [],

      selectId: null,
      attr_sel: "many",
      attr_name: "",
      attr_vals:'',

      iptValue:'',
      isIpt:true,

      compileId:null,
      comarrid:null
    };
  },
  methods: {
    fin(a, sel) {
      let id = sel[sel.length - 1].cat_id;
      this.selectId = id;
    },
    fin1(e) {
      if (!e) {
        this.getParamsList();
      }
    },
    select(info) {
      if (info == 1) {
        this.attr_sel = "many";
        this.getParamsList();
      } else {
        this.attr_sel = "only";
        this.getParamsList();
      }
    },
    // 编辑和删除
    compile(item) {
      console.log(item);
      this.$refs.addCate2.isShow = true
      this.compileId = item.cat_id
      this.comarrid = item.attr_id
    },
    remove(item) {
      console.log(item);
      this.$Modal.confirm({
        title: "确认",
        content: "<p>确认删除</p>",
        onOk: () => {
          deleParams(this.selectId, item.attr_id).then((res) => {
            if (res.data.meta.status == 200) {
              this.$Message.success(res.data.meta.msg);
              this.getParamsList();
            }
          });
        },
      });
    },

    // 添加按钮处理事件
    addclick() {
      this.$refs.addCate1.isShow = true;
    },
    handleAddpar(a) {
      console.log(a);
      this.attr_name = a.cat_name;
      this.addtParams();
      this.getParamsList();
    },
    handleAddnam(obj){
      console.log(obj);
      compilerParams(this.compileId,this.comarrid,obj.cat_name,this.attr_sel,obj.desc).then(res=>{
        console.log(res);
        if(res.data.meta.status == 200){
          this.$Message.success(res.data.meta.msg)
          this.getParamsList()
        }
      })
    },

    is(index) {
      return this.currentIndex.some((item) => index === item);
    },
    openlist(index) {
      if (!this.currentIndex.some((item) => index === item)) {
        this.currentIndex.push(index);
      } else {
        let ind = this.currentIndex.indexOf(index);
        this.currentIndex.splice(ind, 1);
      }
    },
  // 添加tag标签参数
    tagClick(){
      this.isIpt = false
    },
    inpSure(){
       this.isIpt = true
       this.attr_vals = this.iptValue
       this.addtParams()
    },
    /* 格式化数据 */
    // 级联选择格式化
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
    formatP(val){
      let va = val.split(',')
      console.log(va);
      return va
    },
    // 网络请求
    getParamsList() {
      getParamsList(this.selectId, this.attr_sel).then((res) => {
        console.log(res);
        this.paramsList = res.data.data;
      });
    },
    addtParams() {
      addtParams(this.selectId, this.attr_name, this.attr_sel,this.attr_vals).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    getCateAll().then((res) => {
      // console.log(res);
      this.cascader = this.format(res.data.data);
    });
  },
};
</script>

<style lang="less" >
.box {
  padding-right: 20px;
}
.notice {
  background: #faf0e0;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 20px;
  display: flex;
  color: #ff9900;
  align-items: center;
  font-size: 13px;
}
.selCate {
  display: flex;
  align-items: center;
  margin: 15px 0 20px;
  span {
    font-size: 16px;
  }
}
.addbtn {
  margin: 15px 0;
}
.container-tag{
  padding: 20px 40px;
}
.treelist {
  width: 100%;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-radius: 3px;
  & > li {
    .tra {
      padding: 20px 50px;
    }
  }
}
.ivu-tag-blue .ivu-icon-ios-close {
  color: #1890ff !important;
}
.open {
  transform: rotate(-180deg);
  transition: all 0.3s;
}
.close {
  transform: rotate(0deg);
  transition: all 0.3s;
}
.list-item {
  width: 100%;
  // margin: 0 10px;
  text-align: center;
  display: flex;
  li {
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    height: 38px;
    line-height: 38px;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // overflow: hidden;
    &:first-child {
      width: 60px;
    }
    &:nth-child(2) {
      width: 60px;
      text-indent: 0.1rem;
    }
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      flex: 1;
    }
  }
}
</style>