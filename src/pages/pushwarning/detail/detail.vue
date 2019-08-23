<template>
  <div class="judgment_detail_box border_box">
    <div class="tab_bar_box border_box flex_v_center">
      <div class="left_box">
        <i class="back_icon" @click="goback"></i>
      </div>
      <div class="right_box">
        <i class="copy_icon" @click="copyInfo"></i>
        <!-- <i class="del_icon" @click="deleteInfo"></i> -->
      </div>
    </div>
    <div class="detail_content_box">
      <div class="info_box border_box">
        <h1 class="info_title">{{detailInfo.title}}</h1>
        <div class="info_source_time_box border_box flex_v_center">
          <p>
            <span class="info_tendency zheng" v-if="detailInfo.orientation == 1">正</span>
            <span class="info_tendency fu" v-else-if="detailInfo.orientation == 2">负</span>
            <span class="info_tendency zhong" v-else-if="detailInfo.orientation == 3">中</span>
            <span class="info_source ellipsis">{{detailInfo.webname}}</span>
            <span class="info_author ellipsis">{{detailInfo.author}}</span>
          </p>
          <p>
            <span class="info_time">{{detailInfo.publishTime}}</span>
          </p>
        </div>
        <a :href="detailInfo.url" class="view_original">查看原文</a>
      </div>
      <!-- 内容 -->
      <div class="judgment_txt_box border_box " v-html="detailInfo.content" :class="isIOS ? 'marginbotm2' : 'marginbotm'"></div>
    </div>
    <!-- 下载 -->
    <div class="download_box border_box flex_between">
      <div class="yqms_logo_box border_box">
        <img src="../../../assets/images/judgment/yqms_logo.svg" class="yqms_logo" />
        <span class="logo_txt">舆情秘书</span>
      </div>
      <!-- <button class="download_btn border_box">下载</button> -->
      <a href="https://dl.istarshine.com/yqms/FBaddress/yqmsfb.html" class="download_btn border_box">下载</a>
    </div>
  </div>
</template>
<script>
import {handleClipboard} from '../../../assets/js/clipboard';
import { Notify } from 'vant';
import { getDetailsInfo } from '@/api/judgment'
let moment = require("moment");

export default {
  name: 'pushwarningdetail',
  components: {
  },  
  data(){
    return {
      detailInfo: {
        title:'',                   //标题
        content:'',                 //内容
        url:'',                     //原文连接
        Base64url:'',               //base64 url
        author:'',                  //作者
        publishTime:'',             //发布时间
        orientation:'',             //倾向性  1 正 2负  3中
        isRead:'',                  //是否已读
        proposal:'',                //处置建议
        webname:'',                 //来源
        abstracts:'',               //摘要
        keyword:'',                 //关键词
        overseas:'',                //是否境外
        simhash:'',                 //信息simhash
        isReport:'',                //加入简报
        infoid:'',                  //infoid
        tags:[],                    //事件分类
        isMyAttention:'0',          //是否加入过关注    0 否 1是
        warningLevel:'',            //0：一般，1：中等，2：严重，3：高危
      },
      uuid:'',                      //信息uuid
      simhash:'',                   //信息simhash
      infoid:'',                    //信息infoid
      isIOS: false, 
    }
  },
  methods: {
    queryData(){
      let params = {
        id: this.uuid
      }
      getDetailsInfo(params).then(res => {
        if(res.data.status == '0'){
          let result = res.data.result.data;
          if(result != ''){
            this.detailInfo.title = result.title;
            this.detailInfo.content = result.content;
            this.detailInfo.url = result.url;
            // this.detailInfo.Base64url = Base64.encode(info.url);
            this.detailInfo.author = result.author;
            this.detailInfo.publishTime = moment(result.publishTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
            this.detailInfo.orientation = result.orientation;
            this.detailInfo.isRead = result.isRead;
            this.detailInfo.webname = result.webname;
            this.detailInfo.proposal = result.proposal;
            this.detailInfo.warningLevel = result.warningLevel;
            this.detailInfo.abstracts = result.abstracts;
            this.detailInfo.simhash = result.simhash;
            this.detailInfo.infoid = result.infoId;
            this.detailInfo.keyword = result.keyword;
            this.detailInfo.overseas = result.overseas;
            this.detailInfo.isReport = result.isReport;
            this.detailInfo.isMyAttention = result.isMyAttention;
            this.detailInfo.replyNum = result.replyNum;
            this.detailInfo.forwardNum = result.forwardNum;
            this.detailInfo.tags = JSON.parse(result.tags);
          }
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    copyInfo(){
      let tendency = '';
      if(this.detailInfo.orientation == 1) {
        tendency = '正面';
      }else if(this.detailInfo.orientation == 2) {
        tendency = '负面';
      }else if(this.detailInfo.orientation == 3) {
        tendency = '中性';
      }
      let content = '';
        content = content + '标题：' + this.detailInfo.title + '\n';
        content = content + '涉及关键词：' + this.detailInfo.keyword + '\n';
        content = content + '链接：' + this.detailInfo.url + '\n';
        content = content + '摘要：' + this.detailInfo.abstracts.getAbstract() + '\n';
        content = content + '时间：' + this.detailInfo.publishTime + '\n';
        content = content + '来源：' + this.detailInfo.webname + '\n';
        content = content + '作者：' + this.detailInfo.author + '\n';
        content = content + '倾向性：' + tendency + '\n';
        content = content + '评论数：' + this.detailInfo.replyNum + '\n';
        content = content + '转发数：' + this.detailInfo.forwardNum + '\n';

      handleClipboard(content, event, () => {
        Notify({
          message: '复制成功',
          duration: 1000,
          color: "",
          className: "notifyNew",
          background: ''
        });
        let params = {
          uuid: _this.uuid,
          infoType: '4' //1 专题 、2预警、3舆情研判微信端 、4推送预警微信端
        }
        _this.$store.commit('saveCopyInfo',params);
      }, () => {
        Notify({
          message: '复制失败！',
          duration: 1000,
          color: "",
          className: "notifyErr",
          background: ''
        });
      });
    },
    goback(){
      window.history.go(-1);
    }
  },
  mounted() {
    let query = this.$route.query;
    this.uuid = query.uuid;
    this.simhash = query.simhash;
    this.infoid = query.infoid;
    this.queryData();
    let userAgent = navigator.userAgent || '';
    // this.isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
    this.isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../../judgment/detail/detail.css");
</style>
