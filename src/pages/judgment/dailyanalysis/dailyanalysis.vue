<template>
  <div class="dailyanalysis_box border_box">
    <div class="daily_time_box border_box flex_verticle white_bg">
      <div class="user_icon_box">
        <img src="../../../assets/images/judgment/user_icon.svg" class="user_icon" />
      </div>
      <p class="daily_time">{{fromTime}} ～ {{toTime}}</p>
    </div>
    <!-- 概述 -->
    <div class="daily_summary_box border_box white_bg">
      <h1 class="daily_title">概述</h1>
      <p class="daily_summary">{{dayReportSummary}}</p>
      <h2 class="daily_title2">预警级别</h2>  
      <div class="warning_level_box border_box flex white_bg" v-if="warningLevelData.length > 0">
        <div class="warning_level border_box" v-for="level of warningLevelData" :key="level.id" :class="'level_0'+level.id">
          <p class="warning_txt">{{level.name}}</p>
          <p class="warning_num">{{level.count}}</p>
        </div>
      </div>
      <h2 class="daily_title2 daily_margin">媒体分类</h2>
      <div class="media_sort_box border_box white_bg" v-if="sourceTypeData.length > 0">
        <div class="media_sort border_box" v-for="source of sourceTypeData" :key="source.id">
          <p class="warning_txt">{{source.name}}</p>
          <p class="warning_num">{{source.count}}</p>
        </div>
      </div>
    </div>
    <!-- 统计分析 -->
    <div class="daily_statistical_box border_box white_bg">
      <h1 class="daily_title">统计分析</h1>
      <!-- <h2 class="daily_title2">涉事主体</h2>
      <canvas id="myChart" class="model_01"></canvas> -->
      <template v-if="classfyData.length > 0">
        <h2 class="daily_title2">涉事分类</h2>
        <canvas id="myChart2" class="model_02"></canvas>
      </template>
      <template v-if="tendencyData.tendencyList.length > 0">
        <h2 class="daily_title2">调性分析</h2>
        <p class="model_txt">{{tendencyData.summary}}</p>
        <canvas id="myChart3" class="model_03"></canvas>
      </template>
      <template v-if="activeWebData.activeWebList.length > 0">
        <h2 class="daily_title2">舆情活跃网站(top10)</h2>
        <p class="model_txt">{{activeWebData.summary}}</p>
        <canvas id="myChart4" class="model_04"></canvas>
      </template>
      <template  v-if="activeAuthorData.activeAuthorList.length > 0">
        <h2 class="daily_title2">舆情活跃网民(top10)</h2>
        <p class="model_txt">{{activeAuthorData.summary}}</p>
        <canvas id="myChart5" class="model_05"></canvas>
      </template>
    </div>
    <!-- 重点舆情 -->
    <div class="daily_keypoint_box border_box" v-if="getKeyPublicData.length > 0">
        <h1 class="daily_title daily_title3">重点舆情</h1>
        <div class="daily_keypoint_item border_box white_bg" v-for="(item,i) of getKeyPublicData" :key="i">
          <h3 class="daily_keypoint_title">{{i+1}}、{{item.title}}</h3>
          <p class="daily_keypoint_txt">摘要：{{item.abstracts}}</p>
          <div class="daily_keypoint_url_box">
            <a :href="item.url" class="daily_keypoint_url">查看原文</a>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import F2 from '@antv/f2';
  let moment = require("moment");
  const PieLabel = require('@antv/f2/lib/plugin/pie-label'); // 引入 PieLabel 模块

  import { getDayReportSummary, getWarningLevelStatistics, getSourceTypeStatistics,
    getOriStatistics, getActiveWebStatistics, getActiveAuthorStatistics, getKeyPublicOpinion , getClassfyStatistics } from '@/api/judgment'

  export default {
    name: 'dailyanalysis',
    data() {
      return {
        params: {
          bTime: '',   //开始时间
          eTime: '',   //结束时间
        },
        dayReportSummary: '', //概述
        warningLevelData: [], //预警级别统计
        sourceTypeData: [],   //媒体分类统计
        classfyData: [],      //涉事分类统计
        tendencyData: {       //倾向性统计
          summary: '',
          tendencyList: []
        },
        activeWebData: {      //活跃网站统计
          summary: '',
          activeWebList: []
        },
        activeAuthorData: {   //活跃网民统计
          summary: '',
          activeAuthorList: []
        },
        getKeyPublicData: [], //重点舆情
        keyParams: {
          bTime: '',   //开始时间
          eTime: '',   //结束时间
          pageSize: 10,
          pageNum: 0
        },
        totalWebValue: 0,
        totalPublicValue: 0,
        totalClassfyValue: 0,
        fromTime: '',
        toTime: ''
      }
    },
    components: {
      
    },
    methods: {
      // 涉事分类
      myChart2(data){
        let _this = this;
        let Global = F2.Global;
        let chart = new F2.Chart({
          id: 'myChart2',
          pixelRatio: window.devicePixelRatio
        });

        chart.source(data, {
          count: {
            // tickCount: 5,
            // min: 0,
            minTickInterval: 1
          }
        });
        chart.tooltip({
          showItemMarker: false, // 是否展示每条记录项前面的 marker
          onShow: function onShow(ev) {
            let items = ev.items;
            items[0].name = items[0].title;
            let precent = Math.round(items[0].value/_this.totalClassfyValue * 10000)/100.00;
            items[0].value = items[0].value + '(' +precent +'%)';
          },
          nameStyle: {
            fill: '#fff'
          }
        });
        chart.coord('rect',{
          transposed: true
        });
        chart.axis('name', {
          line: Global._defaultAxis.line,
          grid: null,
          label: function label(text, index, total) {
            var textCfg = {};
            // textCfg.textAlign = 'right';
            if(text.length > 6){
              textCfg.text = text.substring(0,6) + '...';
            }
            return textCfg;
          }
        });
        chart.axis('count', {
          line: Global._defaultAxis.line,
          grid: Global._defaultAxis.grid,
          position: 'right',
          label: function label(text, index, total) {
            var textCfg = {};
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            return textCfg;
          }
        });
        chart.interval().position('name*count').size(12);
        chart.render();
      },
      // 调性分析
      myChart3(data){
        let chart = new F2.Chart({
          id: 'myChart3',
          pixelRatio: window.devicePixelRatio,
          padding: [40, 'auto'],
          plugins: PieLabel
        });
        chart.source(data);
        chart.tooltip(false);
        chart.legend(false);
        chart.coord('polar', {
          transposed: true,
          innerRadius: 0.25,
          radius: 0.85
        });
        chart.axis(false);
        // 配置文本饼图
        chart.pieLabel({
          sidePadding: 25,
          label1: function label1(data,color) {
            return {
              text: data.name,
              fill: color
            };
          }
        });
        chart.interval().position('tendency*count').color('name', ['#00B4EB', '#FF0000' , '#FFA741']).adjust('stack');
        chart.render();
      },
      // 舆情活跃网站(top10)
      myChart4(data){
        let _this = this;
        let Global = F2.Global;
        let chart = new F2.Chart({
          id: 'myChart4',
          pixelRatio: window.devicePixelRatio
        });

        chart.source(data, {
          count: {
            // tickCount: 5,
            // min: 0,
            minTickInterval: 1
          }
        });
        chart.tooltip({
          showItemMarker: false, // 是否展示每条记录项前面的 marker
          onShow: function onShow(ev) {
            let items = ev.items;
            items[0].name = items[0].title;
            let precent = Math.round(items[0].value/_this.totalWebValue * 10000)/100.00;
            items[0].value = items[0].value + '(' +precent +'%)';
          },
          nameStyle: {
            fill: '#fff'
          }
        });
        chart.coord('rect', {
          transposed: true // 坐标系进行转置
        });
        chart.axis('name', {
          line: Global._defaultAxis.line,
          grid: null,
          label: function label(text, index, total) {
            var textCfg = {};
            // textCfg.textAlign = 'right';
            if(text.length > 6){
              textCfg.text = text.substring(0,6) + '...';
            }
            return textCfg;
          }
        });
        chart.axis('count', {
          line: Global._defaultAxis.line,
          grid: Global._defaultAxis.grid,
          position: 'right',
          label: function label(text, index, total) {
            var textCfg = {};
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            return textCfg;
          }
        });
        chart.interval().position('name*count').size(12);
        chart.render();
      },
      // 舆情活跃网民(top10)
      myChart5(data){
        let _this = this;
        let Global = F2.Global;
        let chart = new F2.Chart({
          id: 'myChart5',
          pixelRatio: window.devicePixelRatio
        });

        chart.source(data, {
          count: {
            // tickCount: 5,
            // min: 0,
            minTickInterval: 1
          }
        });
        chart.tooltip({
          showItemMarker: false, // 是否展示每条记录项前面的 marker
          onShow: function onShow(ev) {
            let items = ev.items;
            items[0].name = items[0].title;
            let precent = Math.round(items[0].value/_this.totalWebValue * 10000)/100.00;
            items[0].value = items[0].value + '(' +precent +'%)';
          },
          nameStyle: {
            fill: '#fff'
          }
        });
        chart.coord('rect', {
          transposed: true // 坐标系进行转置
        });
        chart.axis('name', {
          line: Global._defaultAxis.line,
          grid: null,
          label: function label(text, index, total) {
            var textCfg = {};
            // textCfg.textAlign = 'right';
            if(text.length > 6){
              textCfg.text = text.substring(0,6) + '...';
            }
            return textCfg;
          }
        });
        chart.axis('count', {
          line: Global._defaultAxis.line,
          grid: Global._defaultAxis.grid,
          position: 'right',
          label: function label(text, index, total) {
            var textCfg = {};
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            return textCfg;
          }
        });
        /*chart.interval().position('name*count').size('count',count =>{
          if(data.length <= 5){
            return 20;
          }else{
            return 12;
          }
        });*/
        chart.interval().position('name*count').size(12);
        chart.render();
      },
      // 获取日报统计概述
      getSummary(){
        getDayReportSummary(this.params).then(res => {
          if(res.data.status == '0'){
            let result = res.data.result.data || '';
            if(result != ''){
              this.dayReportSummary = result.dayReportSummary || '';
            }else{
              this.dayReportSummary = '';
            }
          }else{
            this.dayReportSummary = '';
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      // 获取预警级别统计
      getWarningLevel(){
        getWarningLevelStatistics(this.params).then(res => {
          if(res.data.status == '0'){
            this.warningLevelData = res.data.result.data.reverse() || [];
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      // 获取媒体分类统计 
      getSourceType(){
        getSourceTypeStatistics(this.params).then(res => {
          if(res.data.status == '0'){
            this.sourceTypeData = res.data.result.data || [];
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      // 获取涉事分类统计
      getClassfy(){
        getClassfyStatistics(this.params).then(res => {
          if(res.data.status == '0'){
            let result = res.data.result.data || [];
            let newList = result.reverse() || [];
            if(newList.length > 0){
              for(let i in newList){
                this.totalClassfyValue += newList[i].count;
              }
              this.classfyData = newList;
              this.$nextTick(() => {
                this.myChart2(this.classfyData);
              });
            }
          }else{
            
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      // 获取倾向性统计
      getTendency(){
        getOriStatistics(this.params).then(res => {
          if(res.data.status == '0'){
            let result = res.data.result.data || '';
            if(result != ''){
              this.tendencyData.summary = result.summary || '';
              this.tendencyData.tendencyList = result.oriList || [];
              if(this.tendencyData.tendencyList.length > 0){
                for(let i in this.tendencyData.tendencyList){
                  this.tendencyData.tendencyList[i].sort = 'tendency';
                }
                this.$nextTick(() => {
                  this.myChart3(this.tendencyData.tendencyList);
                });
              }
            }else{
              this.tendencyData.summary = '';
              this.tendencyData.tendencyList = [];
            }
          }else{
            this.tendencyData.summary = '';
            this.tendencyData.tendencyList = [];
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      // 获取活跃网站统计
      getActiveWeb(){
        getActiveWebStatistics(this.params).then(res => {
          if(res.data.status == '0'){
            let result = res.data.result.data || '';
            if(result != ''){
              this.activeWebData.summary = result.summary || '';
              let newList = result.activeWebList.reverse() || [];
              if(newList.length > 0){
                for(let i in newList){
                  this.totalWebValue += newList[i].count;
                }
                this.activeWebData.activeWebList = newList;
                this.$nextTick(() => {
                  this.myChart4(this.activeWebData.activeWebList);
                });
              }
            }else{
              this.activeWebData.summary = '';
              this.activeWebData.activeWebList = [];
            }
          }else{
            this.activeWebData.summary = '';
            this.activeWebData.activeWebList = [];
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      // 获取活跃网民统计
      getActiveAuthor(){
        getActiveAuthorStatistics(this.params).then(res => {
          if(res.data.status == '0'){
            let result = res.data.result.data || '';
            if(result != ''){
              this.activeAuthorData.summary = result.summary || '';
              let newList = result.activeAuthorList.reverse() || [];
              if(newList.length > 0){
                for(let i in newList){
                  this.totalPublicValue += newList[i].count;
                }
                this.activeAuthorData.activeAuthorList = newList;
                this.$nextTick(() => {
                  this.myChart5(this.activeAuthorData.activeAuthorList);
                });
              }
            }else{
              this.activeAuthorData.summary = '';
              this.activeAuthorData.activeAuthorList = [];
            }
          }else{
            this.activeAuthorData.summary = '';
            this.activeAuthorData.activeAuthorList = [];
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      // 获取重点舆情
      getKeyPublic(){
        this.keyParams.pageNum = parseInt(this.keyParams.pageNum) + 1;
        getKeyPublicOpinion(this.keyParams).then(res => {
          if(res.data.status == '0'){
            let result = res.data.result.data || [];
            if(result.length > 0){
              for(let i in result){
                let item = result[i];
                item.abstracts = item.abstracts.getAbstract();
                this.getKeyPublicData.push(item);
              }
            }else {
              this.getKeyPublicData = [];
            }
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      queryData(){
        this.getSummary();
        this.getWarningLevel();
        this.getSourceType();
        this.getClassfy();
        this.getTendency();
        this.getActiveWeb();
        this.getActiveAuthor();
        this.getKeyPublic();
      }
    },
    mounted() {
      let query = this.$route.query;
      this.params.bTime = query.btime;
      this.params.eTime = query.etime;
      this.keyParams.bTime = query.btime;
      this.keyParams.eTime = query.etime;
      this.queryData();
      this.fromTime = moment(query.btime, "YYYYMMDDHHmmss").format('MM-DD HH:mm:ss');
      this.toTime = moment(query.etime, "YYYYMMDDHHmmss").format('MM-DD HH:mm:ss');
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./dailyanalysis.css");
</style>
