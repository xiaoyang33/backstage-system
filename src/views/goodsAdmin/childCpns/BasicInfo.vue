<template>
  <div>
    <div class="form-item">
      <div>
        <i>* </i>
        <span> 商品名称</span>
      </div>
      <Input v-model="fromInfo.goods_name" placeholder="请输入商品名称" width="100%" />
    </div>
    <div class="form-item">
      <div>
        <i>* </i>
        <span> 商品价格</span>
      </div>
      <Input v-model="fromInfo.goods_price" placeholder="请输入商品价格" width="100%" />
    </div>
    <div class="form-item">
      <div>
        <i>* </i>
        <span> 商品重量</span>
      </div>
      <Input v-model="fromInfo.goods_weight" placeholder="请输入商品重量" width="100%" />
    </div>
    <div class="form-item">
      <div>
        <i>* </i>
        <span> 商品数量</span>
      </div>
      <Input v-model="fromInfo.goods_number" type="number" min="0" placeholder="请输入商品数量" width="100%" />
    </div>
    <div class="selCate">
      <div>
        <i>* </i><span>请选择商品分类：</span>
      </div>
      <Cascader
        @on-change="fin"
        style="width:250px;z-index:999"
        :data="cascader"
        change-on-select
        trigger="hover"
      ></Cascader>
    </div>
  </div>
</template>

<script>
import { getCate, getCateAll} from '../../../network/goodsAdmin'
export default {
    data(){
      return {
        fromInfo:{
          goods_name:'',
          goods_price:1,
          goods_weight:1,
          goods_number:1,
          goods_cat:''
        },
       cascader:[],
      }
    },
    methods:{
      format(val) {
      if (val === undefined) return [];
      let arr = [];
      val.forEach((item) => {
        let obj = {
          value: item.cat_name,
          label: item.cat_name,
          cat_pid: item.cat_pid,
          cat_name: item.cat_name,
          cat_level: item.cat_level,
          cat_id: item.cat_id,
          children: this.format(item.children),
        };
        arr.push(obj);
      });
      return arr;
    },
    fin(e,a){
        // console.log(a);
        let str = ''
        a.forEach(item=>{
          str+=item.cat_id+','
        })
        str=str.substring(0,str.length-1)
        // console.log(str);
        this.fromInfo.goods_cat = str
    }
    },
    created(){
      getCateAll().then(res=>{
        // console.log(res)
        this.cascader = this.format(res.data.data)
      })
    },
    beforeDestroy(){
      this.$store.commit('setInfo',this.fromInfo)
    }
}
</script>

<style lang="less" scoped>
.form-item{
  div{
    margin-bottom: 15px;
    width: 100%;
    i{
      color: red;
    }
  }
}
.selCate {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    font-size: 16px;
  }
  i{
    color: red;
  }
  &>div{
    margin-bottom: 10px;
  }
}
</style>