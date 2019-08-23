import Vue from 'vue'
/*防止重复点击*/
Vue.directive('clickoutside', {
	deep: true,
	bind: function(el, binding) {
    function documentHandler(e) {
      if(el.contains(e.target)) {
        return false;
      }
      if(binding.expression) {
        binding.value(e)
      }
    }
    el._vueClickOutside_ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind: function(el) {
    document.removeEventListener('click', el._vueClickOutside_);
    delete el._vueClickOutside_;
  }
})

/* eg:
<template>
  <div v-clickoutside="handleClickOutSide">1111111</div>
</template> */
