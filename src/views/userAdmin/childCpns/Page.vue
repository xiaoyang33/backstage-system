         <!-- 分页器 -->
<template>
<div class="pag">
     <Page :total="zs" show-total  show-elevator />

</div>
</template>
<script>
import {uresPag} from '../../../network/userAdmin'
export default {
    props: {

    },
    data() {
        return {
            list:[],
            zs: null,
        };
    },
    created(){
        uresPag().then((res)=>{
            console.log(res.data.data);
            this.list =res.data.data
            this.zs = res.data.data.total
            
        })
    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.pag{
    margin: 20px 0px;
}

</style>
