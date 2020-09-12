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
</style>
<template>
  <div class="layout">
    <Layout>
      <Sider
        :style="{height:'99.7vh'}"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <Menu    theme="dark" width="auto" :class="menuitemClasses">
          <Submenu name="1">
              <template slot="title">
               <Icon type="ios-people-outline" />
                  用户管理
              </template>
              <MenuItem to="/aa" name="1-1">Option 1</MenuItem>
              <MenuItem name="1-2">Option 2</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="2">
              <template slot="title">
                  <Icon type="ios-lock-outline" />
                  权限管理
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
              <MenuItem name="2-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="3">
              <template slot="title">
                  <Icon type="ios-cart-outline" />
                  商品管理
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
              <MenuItem name="3-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="3">
              <template slot="title">
                  <Icon type="ios-git-compare" />
                  订单管理
              </template>
              <MenuItem name="4-1">Option 1</MenuItem>
              <MenuItem name="4-2">Option 2</MenuItem>
              <MenuItem name="4-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="5">
              <template slot="title">
                  <Icon type="ios-stats-outline" />
                  数据统计
              </template>
              <MenuItem name="5-1">Option 1</MenuItem>
              <MenuItem name="5-2">Option 2</MenuItem>
              <MenuItem name="5-3">Option 3</MenuItem>
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
          <Breadcrumb class="bread">
            <BreadcrumbItem >Home</BreadcrumbItem>
          </Breadcrumb>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <slot></slot>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import request from '../network/'
export default {
  data() {
    return {
      isCollapsed: false,
    };
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
    aaa(a){
      console.log(a);
    }
  },
};
</script>
