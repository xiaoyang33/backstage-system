<style scoped>
.layout {
  
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.bread{
  display: inline-block;
}
.sider{
  height: calc(99.7vh - 80px);
}
.header{
  height: 80px;
  line-height: 80px;
  background: #515A6E;
  color: #fff;
  font-size: 40px;
  border-bottom: 2px solid #ccc;
  text-indent: 3rem;
}
.ivu-layout{
  height: calc(99.7vh - 84px);
  overflow: hidden;
}
.container{
  height: calc(99.7vh - 84px - 80px);
  overflow: auto;
  padding-top: 15px;
  padding-left: 20px;
}
.quit{
  float: right;
  margin-right: 30px;
}
</style>
<template>
  <div class="layout">
    <header class="header">商品后台管理系统 
           <div class="quit">
        <Button @click="success">退出</Button>
     </div>
    </header>
   
   
    <Layout>
      <Sider
      class="sider"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <Menu theme="dark" width="auto" accordion  :class="menuitemClasses">
          <Submenu :name="index" v-for="(item,index) in sider" :key="item.id">
              <template slot="title">
               <Icon :type="list[index]" />
                  {{item.authName}}
              </template>
              <MenuItem v-for="(it,ind) in item.children" 
              :key="it.id" 
              :to="path(it.path)" 
              :name="index+'-'+ind">
              <!-- <Icon :type="list[ind+1]" /> -->
              {{it.authName}}
              </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon>
          <Breadcrumb separator=">" class="bread">
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem to="/home">未完成</BreadcrumbItem>
            <BreadcrumbItem to="/home">未完成</BreadcrumbItem>
          </Breadcrumb>
        </Header>
        <Content :style="{margin: '20px','margin-bottom':0, background: '#fff', minHeight: '260px'}">
          <div class="container" ref="aa">
            <slot></slot>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import {getSider,Login} from '../network/others'
export default {
  data() {
    return {
      isCollapsed: false,
      sider:[],
      list:[
        'ios-people',
        'md-lock',
        'ios-cart',
        'md-repeat',
        'ios-stats'
      ]
    };
  },
  created(){
    getSider().then(res=>{
      // console.log(res);
      this.sider = res.data.data
    })
    // console.log(this.$route);
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    path(p){
      return '/home/'+p
    },
    success () {
       Login().then((res)=>{
         localStorage.removeItem('token')
         this.$router.push('/login')
         this.$Message.success('退出成功');
       })
            },
  },
};
</script>
