<template>
    <div>
    <Timeline >
        <TimelineItem color="green">发布1.0版本</TimelineItem>
        <TimelineItem color="green">发布2.0版本</TimelineItem>
        <TimelineItem color="red">严重故障</TimelineItem>
        <TimelineItem color="blue">发布3.0版本</TimelineItem>
    </Timeline>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            list:[]

        };
    },
    created(){
        office().then((res)=>{
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

</style>
