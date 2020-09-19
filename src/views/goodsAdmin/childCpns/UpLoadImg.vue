<template>
  <div>
    <Upload
        multiple
        @on-success="aa"
        action="http://192.168.1.13:8888/api/private/v1/upload">
        <Button icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods:{
    aa(a){
      console.log(a);
    },
  }
}
</script>

<style>

</style>