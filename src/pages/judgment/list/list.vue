<template>
  <div class="wary_list" @click="colseLayer()" id="clip_num">
    <van-pull-refresh v-model="isLoading_qj" @refresh="onRefresh">
    <van-sticky>
      <van-dropdown-menu class="list_menu">
        <van-dropdown-item :title="parameterType.time.info" ref="item_time" title-class="list_item" @close="closeItem({type:'item_time'})">
          <ul class="timeUl">
            <li :class="parameterType.time.val == '' ? 'hover':''" @click="screenList({type:'time',val:'',info:'全部时间'})">全部时间</li>
            <li :class="parameterType.time.val == '1day' ? 'hover':''" @click="screenList({type:'time',val:'1day',info:'今日'})">今日</li>
            <li :class="parameterType.time.val == '24hour' ? 'hover':''" @click="screenList({type:'time',val:'24hour',info:'24小时'})">24小时</li>
            <li :class="parameterType.time.val == '7day' ? 'hover':''" @click="screenList({type:'time',val:'7day',info:'7天'})">7天</li>
            <li :class="parameterType.time.val == '30day' ? 'hover':''" @click="screenList({type:'time',val:'30day',info:'30天'})">30天</li>
            <li :class="parameterType.time.val == 'zdy' ? 'hover':''" @click="showZdytime()">自定义</li>
          </ul>
        </van-dropdown-item>
        <van-dropdown-item title="媒体类型" ref="item_sourceType" title-class="list_item" @close="closeItem({type:'item_sourceType'})">
          <p class="pub_tit">媒体类型（多选）</p>
          <ul class="pub_Ul">
            <li :class="parameterType.sourceType.val == '' ? 'hover':''" @click="multipleChoice({type:'sourceType',val:'',info:'全部'})">全部</li>
            <li v-for="(source,s) of sourceType" v-bind:key="s" :class="(parameterType.sourceType.val.indexOf(source.sourceCode) > -1) ? 'hover' : ''" @click="multipleChoice({type:'sourceType',val:source.sourceCode,info:source.sourceName})" >{{source.sourceName}}</li>
          </ul>
          <div class="clearfix"></div>
          <div class="button_warys">
            <span @click="resetInfo({type:'sourceType'})">重置</span>
            <span @click="screenList({type:'sourceType',val:'',info:''})">确定</span>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="item_screen" title-class="list_item list_item_sx" @close="closeItem({type:'screen'})">
          <p class="pub_tit">预警级别（多选）</p>
          <ul class="pub_Ul">
            <li :class="parameterType.warningLevel.val == '' ? 'hover':''" @click="multipleChoice({type:'warningLevel',val:'',info:'全部'})">全部</li>
            <li :class="(parameterType.warningLevel.val.indexOf('0') > -1) ? 'hover' : ''" @click="multipleChoice({type:'warningLevel',val:'0',info:'普通'})" >普通</li>
            <li :class="(parameterType.warningLevel.val.indexOf('1') > -1) ? 'hover' : ''" @click="multipleChoice({type:'warningLevel',val:'1',info:'中等'})">中等</li>
            <li :class="(parameterType.warningLevel.val.indexOf('2') > -1) ? 'hover' : ''" @click="multipleChoice({type:'warningLevel',val:'2',info:'重要'})">严重 </li>
            <li :class="(parameterType.warningLevel.val.indexOf('3') > -1) ? 'hover' : ''" @click="multipleChoice({type:'warningLevel',val:'3',info:'高危'})">高危</li>
          </ul>
          <div class="clearfix"></div>
          <p class="pub_tit">摘要（单选）</p>
          <ul class="pub_Ul">
            <li :class="parameterType.abstract.val ? 'hover' : ''"  @click="radioChoice({type:'abstract',val:true,info:'显示'})">显示</li>
            <li :class="parameterType.abstract.val ? '' : 'hover'"  @click="radioChoice({type:'abstract',val:false,info:'不显示'})">不显示</li>
          </ul>
          <div class="clearfix"></div>
          <p class="pub_tit">图片识别（单选）</p>
          <ul class="pub_Ul">
            <li :class="(parameterType.isOcr.val == '') ? 'hover' : ''" @click="radioChoice({type:'isOcr',val:'',info:'全部'})">全部</li>
            <li :class="(parameterType.isOcr.val.indexOf('1') > -1) ? 'hover' : ''" @click="radioChoice({type:'isOcr',val:'1',info:'图片识别'})">图片识别</li>
            <li :class="(parameterType.isOcr.val.indexOf('0') > -1) ? 'hover' : ''" @click="radioChoice({type:'isOcr',val:'0',info:'非图片识别'})">非图片识别</li>
          </ul>
          <div class="clearfix"></div>
          <div class="button_warys">
            <span @click="resetInfo({type:'screen'})">重置</span>
            <span @click="screenList({type:'screen',val:'',info:''})">确定</span>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finished_text"
      @load="getList">
      <!--研判列表-->
      <div class="pubWary clearfix" v-for="(item,i) of listData" :key="i" @click.stop="judgmentDetail(item)">
        <div class="warning_txt_box border_box">
          <div class="warning_txt border_box warning_00" v-if="item.warningLevel == 0">普通</div>
          <div class="warning_txt border_box warning_01" v-else-if="item.warningLevel == 1">中等</div>
          <div class="warning_txt border_box warning_02" v-else-if="item.warningLevel == 2">严重</div>
          <div class="warning_txt border_box warning_03" v-else-if="item.warningLevel == 3">高危</div>
        </div>
        <!--研判建议-->
        <div class="flex yqjy">
          <div class="tit"></div>
          <div class="flex_1 info">
            <p>研判建议</p>
            <p>{{item.proposal}}</p>
          </div>
        </div>
        <!--新闻标题-->
        <div class="newTitle">
          <!--<router-link tag="a" :to="{path: 'judgmentdetail', query: { uuid : item.uuid,simhash:item.simhash,infoid:item.infoId}}">{{item.title}}</router-link>-->
          <a v-if="item.title.length > 20">{{item.title.substr(0,20)}}...</a>
          <a v-else>{{item.title}}</a>
        </div>
        <!--摘要-->
        <div class="abstract" v-show="abstractShow">
          <p v-if="item.abstracts.length > 40">{{item.abstracts.substr(0,40)}}...</p>
          <p v-else>{{item.abstracts}}</p>
        </div>
        <!--小图标-->
        <div class="flex newInfo">
          <div class="flex_1 infos">
            <span class="qxx zheng" v-if="item.orientation == 1">正</span>
            <span class="qxx fu" v-else-if="item.orientation == 2">负</span>
            <span class="qxx zhong" v-else-if="item.orientation == 3">中</span>
            <span>{{item.timeZw}}</span>
            <span><a :href="item.url" @click.stop="tzUrl(item.url)" >{{item.webname}}</a></span>
          </div>
          <div class="moreBotton" @click.stop="showMoreCz(i)">
            <div class="gnWary" v-show="item.more_oper">
              <div class="div1" @click.stop="copyInfo(item)">
                <i></i>
                <p>复制信息</p>
              </div>
              <!--<div class="div2" @click.stop="deleteInfo(item)">-->
                <!--<i></i>-->
                <!--<p>删除</p>-->
              <!--</div>-->
              <i class="gnSj"></i>
            </div>
          </div>
        </div>
      </div>
      <!--研判列表end-->
    </van-list>
    <!--暂无数据-->
    <div class="nodata" v-show="finished && listData.length == 0">
      <p></p>
      <p>暂无数据</p>
    </div>
    </van-pull-refresh>
    <!--自定义时间-->
    <van-popup
      v-model="timePopup"
      position="bottom"
    >
      <!--开始时间-->
      <van-datetime-picker
        v-model="bTime"
        type="datetime"
        show-toolbar
        title="开始时间"
        confirm-button-text=" "
        cancel-button-text=" "
        :formatter="formatter"
        :visible-item-count = 3
        :max-date="maxDate"
      />
      <!--结束时间-->
      <van-datetime-picker
        v-model="eTime"
        type="datetime"
        title="结束时间"
        :visible-item-count = 3
        confirm-button-text=" "
        cancel-button-text=" "
        :formatter="formatter"
        :max-date="maxDate"
      />
      <div class="timeButton" @click.stop="screenList({type:'zdytime',val:'',info:''})">完成</div>
    </van-popup>
  </div>
</template>
<script>
  let moment = require("moment");

  import {handleClipboard} from '../../../assets/js/clipboard'
  import {getJudgedList,deleteBatchWarning} from '@/api/judgment'
  import {DropdownMenu, DropdownItem, Dialog, Notify, List, Sticky,DatetimePicker,Popup,Toast,PullRefresh} from 'vant';

  export default {
    components: {
      "van-dropdown-menu": DropdownMenu,
      "van-dropdown-item": DropdownItem,
      "van-list": List,
      "van-sticky": Sticky,
      "van-datetime-picker": DatetimePicker,
      "van-popup": Popup,
      "van-pull-refresh": PullRefresh,
    },
    data() {
      return {
        isLoading_qj:false,
        finished_text:'',
        maxDate:new Date(),          //最大时间
        bTime:new Date(moment().format('l')),  //开始时间,默认 0时0分
        eTime:new Date(),          //结束时间
        timePopup:false,            //是否显示自定义时间
        listParameter: {
          sourceType: "",         //来源类型 逗号分隔
          orientation: "",        //倾向性 逗号分隔
          bTime: "",              //开始时间
          eTime: "",              //结束时间
          time: "",               //时间 eg:7day 7天； 24hour 24小时
          warningLevel: "",       //预警级别
          isRead: "",             // 0未读 1已读
          isOcr: "",              // 是否仅看图片识别 0否 1是
          pageSize: "10",         // 每页条数
          pageNum: "0",           //页码
        },
        listData: [],             //列表数据
        sourceType:[],           //媒体类型数据
        loading: false,          //暂停加载数据
        finished: false,         //终止加载数据
        load: true,              //用于判断是否加载中
        abstractShow:true,       //是否显示摘要
        parameterType:{          //参数控制
          time:{
            val:'',
            info:"全部时间"
          },               //时间
          sourceType:{
            val:'',
            info:""
          },         //媒体类型
          isOcr:{
            val:'',
            info:''
          },              //是否仅看图片识别 0否 1是
          warningLevel:{
            val:'',
            info:""
          },       //预警级别
          abstract:{
            val:true,
            info:""
          }  //摘要
        },
        WeixinJSBridgeObj:""
      }
    },
    methods: {
      tzUrl(url){
        window.location = url;
      },
      //跳转详情页
      judgmentDetail(item){
        this.$router.push({path: 'judgmentdetail', query: {uuid : item.uuid,simhash:item.simhash,infoid:item.infoId,openid:this.$store.state.userInfo.openid}});
        // console.log("//wechart-beta.ewrwefg.com/judgmentdetail?uuid="+item.uuid+"&simhash="+item.simhash+"&infoid="+item.infoId);
        // window.location = "//wechart-beta.ewrwefg.com/judgmentdetail?uuid="+item.uuid+"&simhash="+item.simhash+"&infoid="+item.infoId;
      },
      //下拉加载
      onRefresh(){
          this.getList("screen");
      },
      //自定义时间弹层
      showZdytime(){
        this.$refs.item_time.toggle();
        this.timePopup = true;
      },
      //时间过滤
      formatter(type, value){
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        }
        return value;
      },
      //关闭弹层
      colseLayer() {
        this.more_oper = false;
        for (let i in this.listData) {
          this.listData[i].more_oper = false;
        }
      },
      //显示更多操作 复制  删除
      showMoreCz(i) {
        this.colseLayer();
        this.listData[i].more_oper = true;
      },
      //复制信息
      copyInfo(item) {
        let _this = this;
        let content = "";
        let orientation = "";
        if (item.orientation == '1') {
          orientation = '正面';
        }
        if (item.orientation == '2') {
          orientation = '负面';
        }
        if (item.orientation == '3') {
          orientation = '中性';
        }
        content = content + "标题：" + item.title + "\n";
        content = content + "涉及关键词：" + item.keyword + "\n";
        content = content + "链接：" + item.url + "\n";
        content = content + "摘要：" + item.abstracts.getAbstract() + "\n";
        content = content + "时间：" + moment(item.publishTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss') + "\n";
        content = content + "来源：" + item.webname + "\n";
        content = content + "作者：" + item.author + "\n";
        content = content + "倾向性：" + orientation + "\n";
        content = content + "评论数：" + item.replyNum + "\n";
        content = content + "转发数：" + item.forwardNum + "\n";
        handleClipboard(content, event, () => {
          Notify({
            message: '复制成功',
            duration: 1000,
            color: "",
            className: "notifyNew",
            background: ''
          });
          let params = {
            uuid: item.uuid,
            infoType: '3' //1 专题 、2预警、3舆情研判微信端 、4推送预警微信端
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
        })
      },
      //删除信息
      deleteInfo(item) {
        Dialog.confirm({
          title: '删除信息',
          message: '确定删除该条信息？',
          confirmButtonText: '确定',
          confirmButtonColor: '#007EFF',
        }).then(()=> {
          let p = {
            ids:item.uuid
          };
          // on confirm
          deleteBatchWarning(p).then(res=>{
            if(res.data.result && res.data.result.data > 0){
              Notify({
                message: '删除成功',
                duration: 1000,
                color: "",
                className: "notifyNew",
                background: ''
              });
              this.getList("screen");
            }
          }).catch(err=>{
            Notify({
              message: '删除失败！',
              duration: 1000,
              color: "",
              className: "notifyErr",
              background: ''
            });
            console.log(err);
          });
        }).catch((e) => {
          // on cancel
          console.log(e);
        });
      },
      //获得列表信息
      getList(s) {
        if (this.load) {
          this.load = false;
          if(s == 'screen'){
            //筛选
            this.listParameter.pageNum = 1;
            this.finished = false;
            Toast.loading({
              duration: 0,       // 持续展示 toast
              mask: true,
              message: '加载中...'
            })
          }else{
            this.listParameter.pageNum = parseInt(this.listParameter.pageNum) + 1;
          }
          getJudgedList(this.listParameter).then(res => {
            Toast.clear();
            if (res.data.result.data && res.data.result.data.length > 0) {
              let listArray = res.data.result.data;
              if(s == 'screen'){
                this.listData = [];
              }
              let todata = moment().format('YYYYMMDD');
              for (let i in listArray) {
                let beforeMinute = moment(listArray[i].warningTime, "YYYYMMDDHHmmss").format('YYYYMMDD');

                if(todata == beforeMinute){
                  //今天
                  listArray[i].timeZw = "今日 "+moment(listArray[i].warningTime, "YYYYMMDDHHmmss").format('HH:mm');
                }else{
                  listArray[i].timeZw = moment(listArray[i].warningTime, "YYYYMMDDHHmmss").format('MM-DD HH:mm');
                }
                //添加操作判断
                listArray[i].more_oper = false;

                this.listData.push(listArray[i]);
              }
              if (listArray.length < 10) {
                this.finished = true;
              }
            } else {
              if(s == 'screen'){
                this.listData = [];
              }
              this.finished = true;
            }
            if( this.listData.length > 0 && this.finished){
              this.finished_text = "没有更多了"
            }else{
              this.finished_text = ""
            }
            // 加载状态结束
            this.isLoading_qj = false;
            this.loading = false;
            this.load = true;
          }).catch(err => {
            Toast.clear();
            this.finished = true;
            // 加载状态结束
            this.loading = false;
            this.isLoading_qj = false;
            this.load = true;
            console.log(err);
          });
        }
      },
      //单选
      radioChoice(m){
        this.parameterType[m.type].val = m.val;
        this.parameterType[m.type].info = m.info;
      },
      //多选
      multipleChoice(m){
        if(m.val != ''){
          if(this.parameterType[m.type].val.indexOf(m.val) == -1){
            let mval = this.parameterType[m.type].val;
            let minfo = this.parameterType[m.type].info;
            this.parameterType[m.type].val = (mval == "") ? m.val : mval+","+m.val;
            this.parameterType[m.type].info = (minfo == "") ? m.info : minfo+","+m.info;
          }else{
            let str = this.parameterType[m.type].val.split(",");
            let strNew = "";
            for(let i in str){
              if(str[i] != m.val){
                strNew = (strNew == "") ? str[i]:strNew+","+str[i];
              }
            }
            if(strNew.length > 0){
              this.parameterType[m.type].val = strNew;
            }else{
              this.parameterType[m.type].val = "";
            }
          }
        }else{
          this.parameterType[m.type].val = "";
        }
      },
      //筛选数据
      screenList(p){
        /*
        *  p
        *  type:
        *      time             时间
        *      screen             筛选
        *      sourceType       媒体类型
        *      zdytime          自定义时间
        *  val:值
        *  info:文字
        * */
        if(p.type=='time'){
          //时间
          this.listParameter[p.type] = p.val;
          this.parameterType[p.type].val = p.val;
          this.parameterType[p.type].info = p.info;
          this.listParameter.bTime = "";
          this.listParameter.eTime = "";
        }else if(p.type=='screen'){
          //筛选
          //摘要
          this.abstractShow = this.parameterType.abstract.val;
          //预警级别
          this.listParameter.warningLevel = this.parameterType.warningLevel.val;
          //图片识别
          this.listParameter.isOcr = this.parameterType.isOcr.val;
        }else if(p.type=='sourceType'){
          //媒体类型
          this.listParameter.sourceType =  this.parameterType.sourceType.val;
        }else if(p.type=='zdytime'){
          //媒体类型
          this.listParameter.bTime = moment(this.bTime).format("YYYYMMDDHHmmss");
          this.listParameter.eTime = moment(this.eTime).format("YYYYMMDDHHmmss");
          if(this.listParameter.bTime > this.listParameter.eTime){
            Toast('开始时间不能晚于结束时间！');
            return false;
          }
          this.listParameter.time = 'zdy';
          this.parameterType.time.val = 'zdy';
          this.parameterType.time.info =  moment(this.bTime).format("MM-DD")+" 至 "+moment(this.eTime).format("MM-DD");
        }
        this.load = true;
        if(p.type=='zdytime'){
          this.timePopup = false;
        }else{
          this.$refs["item_"+p.type].toggle();
        }
        this.getList('screen');
      },
      //重置
      resetInfo(m){
        /*
        * m.type:
        *    "item_time"            时间层
        *     "screen"                筛选
        *     "sourceType"     媒体类型
        * */
        if(m.type == 'sourceType'){
          this.parameterType.sourceType.val = '';
          this.parameterType.sourceType.info = '媒体类型';
        }else if(m.type == 'screen'){
          this.parameterType.warningLevel.val = '';
          this.parameterType.isOcr.val = '';
          this.parameterType.abstract.val = true;
        }
      },
      //监听关闭
      closeItem(m){
        /*
        * m.type:
        *    "item_time"            时间层
        *     "screen"                筛选
        *     "item_sourceType"     媒体类型
        * */
        if(m.type == 'item_sourceType'){
          let st = this.listParameter.sourceType;
          if(st.length == 0){
            //媒体类型
            this.parameterType.sourceType.val = '';
            this.parameterType.sourceType.info = '媒体类型';
          }else{
            this.parameterType.sourceType.val = st;
          }
        }else if(m.type == 'screen'){
          //筛选
          this.parameterType.warningLevel.val = this.listParameter.warningLevel;
          this.parameterType.isOcr.val = this.listParameter.isOcr;
          this.parameterType.abstract.val = this.abstractShow;
        }
      },
    },
    mounted() {
      let query = this.$route.query;
      let openid = query.openid;
      console.log(openid);
      // this.getList();
      if(this.$store.state.sourceType.sourcetype.length == 0){
        this.$store.dispatch("getAllSourceType").then(()=>{
          this.sourceType = this.$store.state.sourceType.sourcetype
        }).catch(()=>{
        });
      }else{
        this.sourceType = this.$store.state.sourceType.sourcetype
      }
    }
  }
</script>
<style scoped>
  @import url("./list.css");
</style>
