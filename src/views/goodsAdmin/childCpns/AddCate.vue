<template>
  <div>
    <Modal :title="title" v-model="isShow" @on-ok="addClick" class-name="vertical-center-modal">
      <div class="ipt">
        <div class="ipt-item">
          <span>
            <span class="req">*</span> {{colName}}
          </span>
          <Input  v-model="name" placeholder="请输入名称" clearable style="width: 400px" />
        </div>
        <div v-if="title =='编辑商品'">
          <div class="ipt-item">
          <span>
            <span class="req">*</span> 价格
          </span>
          <Input  v-model="compGoods.goods_price" placeholder="请输入价格" clearable style="width: 400px" />
          </div>
          <div class="ipt-item">
          <span>
            <span class="req">*</span> 数量
          </span>
          <Input  v-model="compGoods.goods_number" placeholder="请输入数量" clearable style="width: 400px" />
          </div>
          <div class="ipt-item">
          <span>
            <span class="req">*</span> 重量
          </span>
          <Input  v-model="compGoods.goods_weight" placeholder="请输入重量" clearable style="width: 400px" />
          </div>
        </div>
        <div class="ipt-item" v-if="title == '编辑参数'">
          <span>编辑参数</span>
          <Input
            :autosize="{minRows: 2}"
            type="textarea"
            v-model="desc"
            placeholder="请输入参数,多个以逗号分隔"
            style="width: 400px"
          />
        </div>
        <div class="ipt-item dis" v-if="title == '添加分类'">
          <span>父级分类</span>
           <Cascader ref="cascader"  style="width:400px" @on-change="fin" :data="cascader" change-on-select ></Cascader>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props:{
    title:'',
    colName:'',
    cascader:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isShow: false,
      select:[],
      name:'',
      desc:'',
      compGoods:{
        goods_price:0,
        goods_number:0,
        goods_weight:0
      },
    };
  },
  methods: {
    fin(e,selected){
      console.log(selected);
      this.select = selected
    },
    addClick() {
      if(this.name.trim()==''){
        this.$Message.warning('请输入分类名称')
        return
      }

      let info = this.select[this.select.length -1] || {}
      // console.log(info);
      let cat_pid = info.cat_id || 0
      let cat_level = info.cat_level + 1 || 0
      let obj = {
        cat_pid:cat_pid,
        cat_level:cat_level,
        cat_name:this.name,
        desc:this.desc
      }
      this.compGoods['goods_name'] = this.name
      // console.log(this.compGoods);
      this.name = '',
      this.desc = ''
      this.$emit("add",obj,this.compGoods)
      this.compGoods.goods_price = 0
      this.compGoods.goods_number = 0
      this.compGoods.goods_weight = 0
    },
  }
};
</script>
<style lang="less" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.ipt-item {
  margin: 20px 0;
  & > span {
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 10px;
    .req {
      color: #ff5777;
    }
  }
}
.dis{
  display: flex;
  align-items: center;
}
</style>