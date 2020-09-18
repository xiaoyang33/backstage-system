<template>
  <div>
    <div class="add">
      <Button type="primary" size="large" @click="btnClick" class="btn">添加角色</Button>
    </div>
    <ul class="treelist">
      <li>
        <ul class="list-item">
          <li></li>
          <li>&nbsp;#</li>
          <li>角色名称</li>
          <li>角色描述</li>
          <li>操作</li>
        </ul>
      </li>
      <li v-for="(item,index)  in roleList " :key="item.id">
        <ul class="list-item">
          <li @click="openlist(index)">
            <Icon :class="[ is(index) ? 'open' : 'close']" type="ios-arrow-down"></Icon>
          </li>
          <li>{{index + 1}}</li>
          <li>{{item.roleName}}</li>
          <li>{{item.roleDesc}}</li>
          <li>
            <HandleBtn>
              <Button
                slot="left"
                type="primary"
                style="margin-right: 5px"
                @click="compile(item.id)"
              >
                <Icon type="ios-brush-outline" />编辑
              </Button>
                <Button slot="center" type="error" @click="remove(item.id)">
                <Icon type="ios-trash-outline" />删除
              </Button>
              <Button slot="right" type="warning" @click="alloctaion(item.children,item.id)">
                <Icon type="ios-settings-outline" />分配权限
              </Button>
            </HandleBtn>
          </li>
        </ul>
        <transition name="fade">
          <div v-if="is(index)" class="tra">
            <table>
              <tbody>
                <tr v-for="ite in item.children" :key="ite.id">
                  <td>
                    <Tag closable color="blue" size="large">{{ite.authName}}</Tag>
                  </td>
                  <table>
                    <tbody>
                      <tr v-for="it in ite.children" :key="it.id">
                        <td>
                          <Tag color="green" size="large">{{it.authName}}</Tag>
                        </td>
                        <table>
                          <tr v-for="i in it.children" :key="i.id">
                            <td>
                               <Tag color="volcano" size="large"> {{i.authName}}</Tag>
                              </td>
                          </tr>
                        </table>
                      </tr>
                    </tbody>
                  </table>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
      </li>
    </ul>

    <AddRoles ref="Addroles1" @addsucc="handleaAdd" title="添加用户"></AddRoles>
    <AddRoles ref="Addroles2" @addsucc="handleComp" title="编辑用户"></AddRoles>

    <Modal v-model="isShow" class-name="vertical-center-modal">
      <p>确定删除么..</p>
    </Modal>
    <RightsTree
      v-if="showTree"
      :treeList="rightsList"
      @treeClose="treeClose"
      @cancel="handleCancel"
      @confirm="handleConfirm"
     
    />
  </div>
</template>

<script>
import {
  getUsers,
  delRoles,
  addRoles,
  compile,
  getTreeRights,
  getRights,
  RolesAuth
} from "../../network/jurAdmin";
import AddRoles from "./childCpns/AddRoles";
import HandleBtn from "../../components/HandleBtn";
import RightsTree from "./childCpns/RightsTree";
export default {
  // provide / inject
  components: {
    AddRoles,
    HandleBtn,
    RightsTree,
  },
  data() {
    return {
      currentIndex: [],
      roleList: [],
      isShow: false,
      compileId: "",
      compileRole: {},
      showTree: false,
      rightsList: [],
      roleSelectedId:''
    };
  },
  methods: {
    // 删除角色
    remove(id) {
      this.$Modal.confirm({
        title: "确认",
        content: "<p>确认删除</p>",
        onOk: () => {
          delRoles(id).then((res) => {
            console.log(res);
            if (res.data.meta.status == 200) {
              this.$Message.success(res.data.meta.msg);
              this.get();
            }
          });
        },
      });
    },
    // 处理编辑事件
    handleComp(roles) {
      // console.log(roles);
      compile(this.compileId, roles).then((res) => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.warning(res.data.meta.msg);
        }
        this.get();
      });
    },
    // 权限添加处理
    handleConfirm(selectedList) {
      RolesAuth(this.roleSelectedId,selectedList).then(res=>{
        console.log(res);
        if(res.data.meta.status === 200){
           this.$Message.success(res.data.meta.msg);
           this.get();
        }
      })
      this.getTree()
      this.showTree = false;
    },
    handleCancel() {
       this.getTree()
      this.showTree = false;
    },
    treeClose() {
       this.getTree()
      this.showTree = false;
    },
    // 添加成功后重新请求数据刷新页面
    handleaAdd(roles) {
      // console.log(roles);
      addRoles(roles).then((res) => {
        // console.log(res);
        if (res.data.meta.status == 201) {
          this.$Message.success(res.data.meta.msg);
        } else {
          this.$Message.warning(res.data.meta.msg);
        }
      });
      this.get();
    },
    /*            按钮方法                 */
    // 添加角色
    btnClick() {
      this.$refs.Addroles1.isShow = true;
      this.get()
    },
    // 编辑数据
    compile(id) {
      console.log(id);
      this.compileId = id;
      this.$refs.Addroles2.isShow = true;
    },
    // 分配权限
    alloctaion(item,selected) {
      // console.log(item);
      // console.log(selected);
      this.roleSelectedId = selected
      let arr = this.getRightsId(item);
      // console.log(arr);
      this.rightsList = this.format(this.rightsList, arr);
      this.showTree = true;
    },
    /*           页面方法                 */
    // 列表是否展开
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
    // 格式化数据树需要的数据
    format(data,idList) {
      if (data == undefined) {
        return;
      }
      let arr = [];
      // console.log(idList)
      data.forEach((item) => {
        let obj  = null
        if (idList.some((ite) => item.id === ite)) {
           obj = {
            checked: true,
            selected:true,
            expand: true,
            id: item.id,
            title: item.authName,
            children: this.format(item.children,idList),
          };
        }else{
          obj = {
            expand: true,
            id: item.id,
            title: item.authName,
            children: this.format(item.children,idList),
          };
        }

        arr.push(obj);
      });
      return arr;
    },
    // 获取选中的角色的数据的权限id
    getRightsId(roles) {
      let arr = [];
      // arr.push(roles.id)
      roles.forEach((item) => {
        // arr.push(item.id);
        item.children.forEach((ite) => {
          // arr.push(ite.id);
          ite.children.forEach((it) => {
            arr.push(it.id);
          });
        });
      });
      return arr;
    },
    // 获取数据页面列表数据
    get() {
      getUsers().then((res) => {
        // console.log(res.data.data);
        this.roleList = res.data.data;
      });
    },
    getTree(){
      getTreeRights().then((res) => {
      // console.log(res.data);
      this.rightsList = res.data.data;
    });
    }
  },
  created() {
    this.get();
    this.getTree()
  },
};
</script>

<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.btn {
  width: 160px;
  margin-bottom: 20px;
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
    table {
      width: 100%;
      border-collapse: collapse;
      //  margin: 20px 50px;
      td {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        height: 38px;
        line-height: 38px;
        text-align: center;
      }
    }
  }
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