<template>
  <div>
    <!-- <Skeleton>
      <router-view/>
    </Skeleton> -->
    <!-- <Login/> -->
    <router-view/>
  </div>
</template>

<script>
import Skeleton from "./components/Skeleton";
import Login from './components/Login'
export default {
  components: {
    Skeleton,
    Login
  },
};
</script>

<style>

</style>