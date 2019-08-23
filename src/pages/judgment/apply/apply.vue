<template>
  <div class="apply_box border_box">
    <div class="apply_01 border_box">
        <h3>舆情研判服务</h3>
        <p>舆情信息进行二次人工审核，研<br/>判监测，发现重大舆情线索或负<br/>面报道，根据区域客户、报送内容<br/>、需求进行信息推送第一时间点<br/>对点精准推送。</p>
    </div>
    <div class="apply_02 border_box">
      <h3 class="title">服务介绍</h3>
      <div class="line"></div>
      <div class="icon_box border_box flex margin_top">
        <div class="icon_img border_box icon_01"></div>
        <div class="info_box border_box flex_1">
          <h4 class="info_title">敏感信息精准推送</h4>
          <p class="info_desc">舆情信息进行二次人工审核，研判监测，发现重大舆情线索或负面报道，根据区域客户、报送内容、需求进行信息推送第一时间点对点精准推送。</p>
        </div>
      </div>
      <div class="icon_box border_box flex">
        <div class="icon_img border_box icon_02"></div>
        <div class="info_box border_box flex_1">
          <h4 class="info_title">及时、高效服务模式</h4>
          <p class="info_desc">5*8&nbsp;&nbsp;&nbsp;7*24小时服务时间段，全面检测分析重点舆情信息。</p>
        </div>
      </div>
      <div class="icon_box border_box flex">
        <div class="icon_img border_box icon_03"></div>
        <div class="info_box border_box flex_1">
          <h4 class="info_title">多渠道服务模式</h4>
          <p class="info_desc">采用微信公众号、舆情秘书PC、APP等多形式进行舆情推送服务。</p>
        </div>
      </div>
      <div class="icon_box border_box flex">
        <div class="icon_img border_box icon_04"></div>
        <div class="info_box border_box flex_1">
          <h4 class="info_title">专业化服务团队</h4>
          <p class="info_desc">新闻、传播、新媒体、社会学专业舆情分析审核团队的专业服务。</p>
        </div>
      </div>
    </div>
    <div class="apply_03 border_box">
      <h3 class="title">样例展示</h3>
      <div class="line"></div>
    </div>
    <div class="apply_04 border_box">
      <router-link tag="a" :to="{path: 'openapply'}" class="open_btn" >立即开通</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'judgmentapply',
  components: {
    
  },
  data(){
    return {
      
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./apply.css");
</style>
