<template>
  <div>
    <h4>本年度情况一览</h4>
    <hr class="sp_hr"/>
    <div id="chart_score" class="score"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

    export default {
      data(){
        return{
          opinion:[
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],  // 月份
          opinionDataIncome: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3
          ], // 收入
          opinionDataExpense: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ]// 支出
        }
      },
      mounted(){
        this.$nextTick(function () {
          this.drawScore('chart_score')
        })
      },
      methods:{
        drawScore(id){
          let opinion = this.opinion
          let Income = this.opinionDataIncome
          let Expense = this.opinionDataExpense
          let score_echart = echarts.init(document.getElementById(id))
          score_echart.setOption({
            title : {   //标题
              text: '2017年业绩情况表',
            },
            tooltip : { //气泡提示框，常用于展现更详细的数据 鼠标移到柱状图 柱状图变大 并显示信息
              trigger: 'axis',
              //折线(区域)图 柱状(折线)图 k线图
              //{a}(系列名称) {b}(类目值) {c}(数组) {d}(无)
              formatter: '{b0} {a0}: {c0}百万 <br/> {b1} {a1}: {c1}百万',
              textStyle:{
                fontWeight: 'normal',
                fontSize: 16
              }
            },
            legend: { //	图例，表述数据和图形的关联
              data: ['收入','支出'],
            },
            calculable : true,
            xAxis : [ //直角坐标系中的横轴，通常并默认为类目型
              {
                type : 'category',
                data : opinion
              }
            ],
            yAxis : [ //直角坐标系中的纵轴，通常并默认为数值型
              {
                type : 'value',
                formatter: '{value}' //显示的数据格式
              }
            ],
            series: [
              {
                name:'收入',
                type:'bar',
                data: Income,
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },
                markLine : {
                  data : [
                    {type : 'average', name: '平均值'}
                  ]
                }
              },
              {
                name:'支出',
                type:'bar',
                data: Expense,
                markPoint : {
                  data : [
                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                  ]
                },
                markLine : {
                  data : [
                    {type : 'average', name : '平均值'}
                  ]
                }
              }
            ]
          })
        },
      }
    }
</script>

<style scoped>
.score{
   height: 500px;
   width: 80%;
   margin-left: 10%;
   margin-top: 60px;
   transition: all 1s ease;
 }
 .score:hover{
   border: 2px solid #2d8cf0;
   transform: scale(1.1);
 }
  .sp_hr{
    width: 90%;
    margin: 4px auto;
    height: 2px;
  }
</style>