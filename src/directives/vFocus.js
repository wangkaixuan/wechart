import Vue from 'vue'

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
	deep : true,
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})