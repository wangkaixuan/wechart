<template>
  <div>
    <van-cell-group>
      <van-switch-cell title-class="titlecss" label="开启后，在设定时间段内将不会接收通知信息。" v-model="swichValue" title="消息免打扰" @change="setNoBotherTime()" />
      <p></p>
    </van-cell-group>
    <van-cell-group  v-if="isOpen == '1'">
      <van-cell title="开始时间" title-class="titlecss" :value="btime" @click="showTimeWary('btimePopup')" />
    </van-cell-group>
    <van-cell-group  v-if="isOpen == '1'">
      <van-cell title="结束时间" title-class="titlecss" :value="etime" @click="showTimeWary('etimePopup')" />
    </van-cell-group>
    <!--开始时间-->
    <van-popup
      v-model="btimePopup"
      position="bottom">
      <van-datetime-picker
        v-model="btime_set"
        type="time"
        @confirm="setTime('btime')"
        @cancel="cancelSetTime('btimePopup')"
      />
    </van-popup>
    <!--结束时间-->
    <van-popup
      v-model="etimePopup"
      position="bottom">
      <van-datetime-picker
        v-model="etime_set"
        type="time"
        @confirm="setTime('etime')"
        @cancel="cancelSetTime('etimePopup')"
      />
    </van-popup>
  </div>
</template>
<script>
  import { SwitchCell,CellGroup,Cell,Popup,DatetimePicker } from 'vant';
  import {updateDisturbanceFreeTime,getDisturbanceFreeTime} from '@/api/pushwarning'
  export default {
    components: {
      "van-switch-cell": SwitchCell,
      "van-cell-group": CellGroup,
      "van-cell": Cell,
      "van-datetime-picker": DatetimePicker,
      "van-popup": Popup,
    },
    data(){
      return {
        swichValue: '0',
        isOpen:'0',
        btime:'00:00',
        btime_set:'00:00',
        etime:'00:00',
        etime_set:'00:00',
        btimePopup:false,
        etimePopup:false
      }
    },
    methods:{
      //获取设置信息
      getInfo(){
        getDisturbanceFreeTime().then(res=>{
          if(res.data.result && res.data.result.data){
            let d = res.data.result.data;
            console.log(d);
            this.btime = d.bTime;
            this.btime_set = d.bTime;
            this.etime = d.eTime;
            this.etime_set = d.eTime;
            this.isOpen = d.isOpen;
            this.swichValue = this.isOpen == 1 ? true:false;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //更设置
      updateInfo(){
        let p = {
          bTime:this.btime,
          eTime:this.etime,
          isOpen:this.isOpen
        }
        updateDisturbanceFreeTime(p).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err)
        })
      },
      //设置时间
      setTime(m){
        console.log(m);
        console.log(m+"_set");
        console.log(this[m+"_set"]);
        this[m] = this[m+"_set"];
        this[m+"Popup"] = false;
        this.updateInfo();
      },
      //取消弹层
      cancelSetTime(m){
        this[m] = false;
        console.log(this.btime);
      },
      //显示时间插件
      showTimeWary(m){
        this[m] = true;
      },
      //关闭开启设置
      setNoBotherTime(){
        console.log("-------------");
        if(this.isOpen == '1'){
          this.isOpen = '0';
        }else{
          this.isOpen = '1';
        }
        console.log(this.isOpen);
        this.updateInfo();
      }
    },
    mounted(){
      this.getInfo();
    },
  }
</script>
<style scoped>
  @import url("./pushSet.css");
</style>
