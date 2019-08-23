import Vue from 'vue'
/*防止重复点击*/
Vue.directive('preventReClick’', {
	deep: true,
	inserted(el, binding) {
		el.addEventListener('click', () => {
			if(!el.disabled) {
				el.disabled = true
				setTimeout(() => {
					el.disabled = false
				}, binding.value || 2000)
			}
		})
	}
})

/*
 * eg:
 * <a class="btn" href="javascript:;" v-preventReClick="3000" @click.prevent="pay($event)">立即投保</a>
 * pay (event) {
 *   if (event.target.disabled) {
 *      // 点击太频繁了
 *       return
 *  }
 * ...
}*/
