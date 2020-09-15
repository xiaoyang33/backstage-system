<template>
  <div class="handleBtn">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.handleBtn{
  display: flex;
  justify-content: space-evenly;
}

</style>