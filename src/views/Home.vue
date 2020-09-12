<template>
  <div> 
    <Skeleton>
      <router-view/>
    </Skeleton>
  </div>
</template>

<script>
import Skeleton from '../components/Skeleton'
import handleBtn from '../components/HandleBtn'
export default {
  components:{
    Skeleton,
    handleBtn
  }
  
}
</script>

<style>
.a{
  width: 200px;
}
</style>