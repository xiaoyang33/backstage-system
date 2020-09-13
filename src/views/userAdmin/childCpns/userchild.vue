<template>
<div class="top">
<div class="t1">
    <div class="inp">
    <Input search enter-button placeholder="搜索" />
    </div>
    <div class="butt">
         <Button type="primary">添加用户</Button>
    </div>
</div>
 <Table border :columns="columns1" :data="data1"></Table>
</div>
        
</template>
<script>
import {uresLb} from '../../../network/userAdmin'
export default {
    props: {

    },
     data () {
            return {
                columns1: [
                    {
                        title: '#',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '邮箱',
                        key: 'username'
                    },
                    {
                        title: '电话',
                        key: 'mobile'
                    },
                    {
                        title: '角色',
                        key: 'role_name'
                    },
                    {
                        title: '状态',
                        key: 'mg_state'
                    },
                    {
                        title: '操作',
                        key: '操作'
                    }
                ],
                data1: []
            }
        },
    created(){
        uresLb().then(res=>{
            console.log(res);
        })
    },
    methods: {

    },
 
    components: {

    },
};
</script>

<style scoped lang="less">
.top{
    margin:0px 30px ;
}
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
