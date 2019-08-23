<template>
  <div class="applywait_box border_box">
    <h1 class="title">您的申请已提交</h1>
    <p class="wait_txt">客服人员会尽快与您取得联系</p>
    <p class="wait_tel">客服电话：400-052-1288 <br/>（周一至周五24小时服务）</p>
    <div class="btn_box">
      <a class="sure_btn" @click.stop="closeWindow">知道了</a>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'applywait',
    data() {
      return {
        
      }
    },
    methods: {
      closeWindow(){
       WeixinJSBridge.call('closeWindow');
      }
    },
    mounted() {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./wait.css");
</style>
