<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import Login from './views/Login'
export default {
  components: {
    Login
  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>