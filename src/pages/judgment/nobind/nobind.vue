<template>
  <div class="nobing_box border_box">
    <div class="img_bg border_box" v-show="isShowWbdms"></div>
    <p class="no_bind_txt" v-show="isShowWbdms">未绑定舆情秘书账号</p>
    <div class="no_bind_txts" v-show="isShowWktmk">您尚未开通此服务</div>
    <div class="btn_box">
      <a class="sure_btn" @click.stop="closeWindow">知道了</a>
    </div>
  </div>
</template>
<script>
	
	export default {
    name: 'nobind',
    components: {
      
    },
    data(){
      return {
        isShowWbdms:false,
        isShowWktmk:true
      }
    },
    methods: {
      closeWindow(){
       WeixinJSBridge.call('closeWindow');
      }
    },
    mounted() {
      if(this.$store.state.userInfo.code == ""){
        this.isShowWbdms = true;
        this.isShowWktmk = false;
      }else{
        this.isShowWbdms = false;
        this.isShowWktmk = true;
      }
    }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./nobind.css");
</style>
