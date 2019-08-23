/*防抖*/
export function debounce(fn, delay) {
	let timer;
	return function(...args) {
		if(timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay)
	}
}
/*节流*/
export function throttle(fn, delay) {
	let lastTime = new Date().getTime();
	let currentTime;
	return function(...args) {
		currentTime = new Date().getTime();
		if(currentTime - lastTime < delay) return;
		lastTime = currentTime;
		fn.apply(this, args);
	}
}
