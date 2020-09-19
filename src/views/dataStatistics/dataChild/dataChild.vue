<template>
   <div style="width:100%;height:500px">
       <div id="myChart" style="height:100%; width:70%">
       </div>
   </div>
</template>

<script>
import echarts from 'echarts';
import {DataRe} from '../../../network/datareporter'
export default {
  name: 'hello',
  data () {
    return {
      option:{
           title: {
        text: '用户来源'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {},
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: []
        }
    ],
    yAxis: [],
    series: []
        }
    }
  },
 

  methods: {
  
  },
   mounted(){
        var myChart = echarts.init(document.getElementById('myChart'));
   
        DataRe().then((res)=>{
                console.log(res);
             this.option.legend = res.data.data.legend
             this.option.series = res.data.data.series
             this.option.yAxis= res.data.data.yAxis
             this.option.xAxis[0].data = res.data.data.xAxis[0].data
             console.log(this.option);
             myChart.setOption(this.option);

        })

        
    },
}
</script>

<style scoped lang="less">

</style>