<template>
<div>
<div class="t1">
    <div class="inp">
    <Input size="large" v-model="ssk" search  placeholder="搜索" enter-button @on-search='ssl' />
    </div>
    <div class="butt">
         <Button type="primary" size="large" @click="btnClick">添加用户</Button>
    </div>
</div>
 <Table border :columns="columns1" :data="data1">
    <template slot-scope="{index,row}" slot="action">
        <Button type="primary"  @click="show(index,row.id)">
          <Icon type="ios-brush-outline" />
        </Button>
        <Button style="margin:0 10px" type="error" @click="remove(row.id)">
          <Icon type="ios-trash-outline" />
        </Button>
        <Button type="warning">
          <Icon type="ios-settings-outline" />
        </Button>
      </template>
      <template slot="SWitch">
        <i-Switch v-model="switch1"  @on-change="change" />
      </template>
 </Table>

    <AddUsers ref="AddUsers" />
    <!-- <Redact ref="Redact" @addsucc="handleComp" title="编辑用户"/> -->
</div>

</template>
<script>
import {uresLb,removeUs,redact} from '../../../network/userAdmin'
import AddUsers from './AddUsers'
import Redact from './Redact '
export default {
    props: {

    },
     data () {
            return {
             
                columns1: [
                    {
                        title: '#',
                        key: 'id',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '姓名',
                        key: 'username',
                        align: 'center',

                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align: 'center',

                    },
                    {
                        title: '电话',
                        key: 'create_time',
                        align: 'center',

                    },
                    {
                        title: '角色',
                        key: 'role_name',
                        align: 'center',

                    },
                    {
                        title: '状态',
                        slot:'SWitch',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        slot: "action",
                        align: 'center',
                        width:200

                    }
                ],
                data1: [],                
                switch1:false,
                ssk:'',
                redactId:''
                
            }
        },
         created(){
         uresLb().then((res)=>{
            this.data1 = res.data.data.users;
        })
    },
    //删除
    methods: {
            remove(row) {
                console.log(row);
                removeUs(row).then((res)=>{
                console.log(res.data.meta)
                })
                this.$Message.success('删除成功');
                // this.$Message.success(res.data.meta.msg);   
                //   if (res.data.meta.status == 200) {
                //         this.$Message.success("修改成功");
                //         } else {
                //         this.$Message.warning(res.data.meta.msg);
                //         }
                        
            },

            //   // 编辑事件
            //         handleComp(roles) {
            //         // console.log(roles);
            //         redact(this.redactId, roles).then((res) => {
            //             console.log(res);
            //             if (res.data.meta.status == 200) {
            //             this.$Message.success("修改成功");
            //             } else {
            //             this.$Message.warning(res.data.meta.msg);
            //             }
            //             // this.get();
            //         });
            //         },

            change (status) {
                     uresLb().then((res)=>{
                    console.log(res.data.data.users.id);
                     this.switch1 = res.data.data.users;
                     })
                
                this.$Message.info('开关状态：' + status);
            },
            ssl(){
                uresLb(this.ssk).then((res)=>{
                this.data1 = res.data.data.users;
        })
            },
            //       按钮 
            // show(index,row){
            //       console.log(row);
            //      this.redactId = row;
            //      this.$refs.Redact.mmk= true
            // },
                //添加  
            btnClick(){
            this.$refs.AddUsers.isShow = true
            // this.get();
            },

    },

    components: {
        AddUsers,
        Redact
    },
};
</script>

<style scoped lang="less">

.t1{
    margin: 20px 0px;
    overflow: hidden;
}
.inp{
    float: left;
    margin-right:30px;
    width: 300px;
}
.butt{
    float: left;
}

</style>
