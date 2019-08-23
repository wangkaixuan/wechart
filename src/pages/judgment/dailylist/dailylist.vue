<template>
  <div class="dailylist_box border_box">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finished_text"
      @load="onLoad"
    >
      <a class="daily_item border_box" v-for="(item,i) of list" :key="i" @click="tzdailyanalysis(item)">
        <div class="daily_log border_box flex_v_center">
          <div class="flex_verticle">
            <span class="log_icon"></span>
            <span class="daily_txt">{{item.timeInfo}} 日报</span>
          </div>
          <span class="arrow_icon"></span>
        </div>
      </a>
    </van-list>
    <div class="nodata_box border_box" v-show="nodate">无数据</div>
  </div>
</template>
<script>
  import {getJudgedInfoCount} from '@/api/judgment'
  let moment = require("moment");
  import { List,Toast } from 'vant';
  export default {
    name: 'dailylist',
    data() {
      return {
        finished_text:"",
        nodate:false,
        list: [],
        loading: false,
        finished: false,
        dayReportMintime:this.$store.state.userInfo.dayReportMintime
      }
    },
    components: {
      "van-list": List
    },  
    methods: {
      //跳转详情
      tzdailyanalysis(m){
        console.log(m);
        getJudgedInfoCount({bTime: m.stime,eTime:m.etime}).then(res=>{
          if(res.data.result && res.data.result.data == '1'){
            this.$router.push({path: 'dailyanalysis', query: { btime: m.stime,etime:m.etime,openid:this.$store.state.userInfo.openid}});
          }else{
            Toast({
              message: '当日无数据',
              duration: 1000
            });
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          let l = this.list.length,
              len = parseInt(l)+15;
          console.log(len);
          let drmtime = moment(this.dayReportMintime,'YYYY.MM.DD').format("YYYYMMDDHHmmss");
          for (let i = l; i < len; i++) {
            let days = moment().subtract(i, 'days');
            let format_stime = '';
            let format_etime = '';
            let format_info =  days.format("YYYY-MM-DD");
            if(i == 0){
              format_stime = days.format("YYYYMMDD")+"000000";
              format_etime = days.format("YYYYMMDDHHmmss");
            }else{
              format_stime =  days.format("YYYYMMDD")+"000000";
              format_etime =  days.format("YYYYMMDD")+"235959";
            }
            if(drmtime > format_stime){
              this.finished = true;
              break;
            }
            this.list.push({
              stime:format_stime,
              etime:format_etime,
              timeInfo:format_info
            })
          }
          if(this.list.length == 0){
            this.nodate = true;
          }
          if(this.list.length >0 && this.finished){
            this.finished_text = "没有更多了";
          }else{
            this.finished_text = "";
          }
          // 加载状态结束
          this.loading = false;
        }, 500);
      }
    },
    mounted() {
      // this.onLoad();
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./dailylist.css");
</style>
