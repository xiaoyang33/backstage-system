<template>
    <div>
        <Modal title="修改地址" v-model="isShow"   class-name="vertical-center-modal">
        <div class="ipt-item">
         <div class="left"><span><span class="req">*</span> 省市/区</span></div> <div class="right"> <Cascader :data="data" v-model="value1" style="width: 400px"></Cascader></div>
        </div>
          <div class="ipt-item">
           <span><span class="req">*</span> 详细地址</span>  <Input v-model="value17" maxlength="20"  show-word-limit   style="width:400px" />
           </div>
        </Modal>
    </div>
</template>
<script>
export default {
    props: {
    },
    data () {
            return {
                value1: [],
                 value17: '',
                isShow:false,
                data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '海淀区',
                        children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                },{
                     label: '河南',
                }
                ]
            }
        },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.ipt-item{
   margin: 20px 0;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
  &>span{
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 10px;
 
  }
  .left{
      float: left;
      margin-right: 20px;

  }
  .right{
      float: left;
  }
     .req{
      color: #ff5777;
    
    }
}

</style>
