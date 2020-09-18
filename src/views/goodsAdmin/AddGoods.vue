<template>
  <div>
    <div class="tips">
      <Icon color="#999" style="margin-right:10px" size="22" type="md-alert" />  添加商品信息
    </div>
    <Steps :current="1">
        <Step title="步骤一" content="基本信息"></Step>
        <Step title="步骤二" content="商品参数"></Step>
        <Step title="步骤三" content="商品属性"></Step>
        <Step title="步骤四" content="商品图片"></Step>
        <Step title="步骤五" content="商品内容"></Step>
    </Steps>
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.tips{
  background: #eee;
  // height: 20px;
  border-radius: 4px;
  color: #999;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
</style>