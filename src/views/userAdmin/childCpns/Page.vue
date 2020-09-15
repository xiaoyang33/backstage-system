         <!-- 分页器 -->
<template>
<div class="pag">
     <Page :total="10" show-total show-elevator />

</div>
</template>
<script>
import {uresPag} from '../../../network/userAdmin'
export default {
    props: {

    },
    data() {
        return {
            list:[]
        };
    },
    created(){
        uresPag().then((res)=>{
            console.log(res.data.data);
            this.list =res.data.data
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
