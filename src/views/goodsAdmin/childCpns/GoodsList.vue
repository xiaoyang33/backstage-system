<template>
  <Table border stripe :columns="columns12" :data="goodsList">
    <template slot-scope="{ row }" slot="action">
      <Button type="primary" size="small" style="margin-right: 5px;width:50px;box-sizing:border-box" @click="compile(row)"><Icon type="ios-brush-outline" /></Button>
      <Button type="error" style="width:50px" size="small" @click="remove(row)"><Icon type="ios-trash-outline" /></Button>
    </template>
  </Table>
</template>
<script>
import {formatDate} from '../../../common/utils'
export default {
  props:{
    goodsList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      columns12: [
        {
          title: "#",
          width:60,
          type: 'index',
        },
        {
          title: "商品名称",
          key: "goods_name",
        },
        {
          title: "商品价格(元)",
          key: "goods_price",
          width:100
        },
        {
          title: "商品重量",
          key: "goods_weight",
          width:100
        },
        {
          title: "创建时间",
          key: "add_time",
          width:180
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
    };
  },
  methods: {
    compile(row) {
      // console.log(row);
      this.$emit('compile',row.goods_id)
    },
    remove(row) {
      // console.log(row);
      this.$emit('remove',row.goods_id)
    },
  },
  watch:{
    goodsList(){
      this.goodsList.forEach(item=>{
        let date = new Date(item.add_time * 1000)
        item.add_time =  formatDate(date,'yyyy-MM-dd hh:mm:ss')
      })
    }
  }
};
</script>
