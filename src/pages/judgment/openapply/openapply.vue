<template>
  <div class="openapply_box border_box">
    <h1 class="title">开通申请</h1>
    <!-- <div class="open_item border_box flex_verticle">
      <input type="text" name="uname" v-model="uname" class="open_input border_box" placeholder="请输入联系人" ref="input1" @touchstart="touchstartFun"/>
    </div> -->
    <v-edit-div v-model='uname' class="open_item border_box flex_verticle" placeholder="请输入联系人"></v-edit-div>
    <div class="err border_box" v-show="err.err1.isshow">{{err.err1.text}}</div>
    <!-- <div class="open_item border_box flex_verticle">
      <input type="text" name="tel" v-model="mobile" class="open_input border_box" placeholder="请输入电话" ref="input2"  @touchstart="touchstartFun2"/>
    </div> -->
    <v-edit-div v-model='mobile' class="open_item border_box flex_verticle" placeholder="请输入电话"></v-edit-div>
    <div class="err border_box" v-show="err.err2.isshow">{{err.err2.text}}</div>
    <div class="btn_box">
      <div class="sure_btn" @click.stop="handleSure">确定</div>
      <div class="cancle_btn" @click.stop="handleCancle">取消</div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'vant';
  import vEditDiv from '@/components/editdiv/editdiv.vue'
	import { submitApply } from '@/api/judgment';
	export default {
    name: 'openapply',
    components: {
      vEditDiv
    },
    data(){
      return {
        uname: '',  //联系人
        mobile: '', //电话
        err: {      //错误提示信息
          err1: {
            isshow: false,
            text: '联系人不能为空'
          },
          err2: {
            isshow: false,
            text: '电话不能为空'
          },
        }
      }
    },
    methods: {
      handleSure(){
        var _this = this;
        // 验证联系人
        this.uname = this.uname.trim();
        if(this.uname.length == 0){
          this.err.err1.isshow = true;
          this.err.err1.text = '联系人不能为空';
          return false;
        }else{
          this.err.err1.isshow = false;
        }

        // 验证手机号
        this.mobile = this.mobile.trim();
        // 固定电话 区号+座机号码+分机号码 （3-4位区号，7-8位直播号码，1－4位分机号）
        let isReg = /((^1(3|4|5|6|7|8|9)\d{9}$)|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;

        if(this.mobile.length == 0) {
          this.err.err2.isshow = true;
          this.err.err2.text = '电话不能为空';
          return false;
        }else if(!isReg.test(this.mobile)){
          this.err.err2.isshow = true;
          this.err.err2.text = '请输入正确的电话号码';
          return false;
        }else {
          this.err.err2.isshow = false;
          this.err.err2.text = '';
        }

        if(!this.err.err1.isshow && !this.err.err2.isshow){
          let params = {
            who : this.uname,
            tel : this.mobile
          }
          // 申请开通
          submitApply(params).then(res =>{
            if(res.data.status == 0){
              /*
                code值：
                -1  已开通舆情研判服务
                -2  申请审批中，请勿重复提交
                0  申请失败
                1 申请成功
              */
              let code = res.data.result.data.code;
              if(code == 0){
                Toast({
                  message:"申请失败",
                  duration: 1000,
                });
              }else if(code == 1){
                Toast({
                  message:"申请成功",
                  duration: 1000,
                  onClose(){
                    _this.$router.push({path: 'applywait'});
                  }
                });
              }else if(code == -1){
                _this.$router.push({path: '/'});
              }else if(code == -2){
                Toast({
                  message:"申请审批中，请勿重复提交!",
                  duration: 1000,
                  onClose(){
                    _this.$router.push({path: 'applywait'});
                  }
                });
              }
            }
          }).catch(err => {
            console.log(err, '请求失败！');
          });
        }
      },
      handleCancle(){
        this.$router.push({path: 'judgmentapply'});
      },
      touchstartFun(){
        this.$refs.input1.focus();
      },
      touchstartFun2(){
        this.$refs.input2.focus();
      }
    },
    mounted() {
      
    }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./openapply.css");
</style>
