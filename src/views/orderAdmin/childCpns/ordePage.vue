<template>
    <div class="pag">
     <Page :total="zy" show-total  show-elevator />

    </div>
</template>

<script>
import {orders} from '../../../network/orderAdime'
export default {
    props: {

    },
    data() {
        return {
        zy:null
        };
    },
    created(){
        orders().then((res)=>{
            console.log(res.data.data.total);
            this.zy =res.data.data.total
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
