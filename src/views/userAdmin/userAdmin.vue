<template>
<div class="top">
    <usrechild></usrechild>
    <Page></Page>
</div>

</template>

<script>
import usrechild from './childCpns/userchild'
import Page from './childCpns/Page'
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {

    },
    components: {
        usrechild,
        Page
    },
};
</script>

<style scoped lang="less">
.top{
    margin:0px 30px ;
}

</style>
