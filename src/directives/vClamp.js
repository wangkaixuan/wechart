/**
 * create 2019/1/23  haojianliang
 */
import Vue from 'vue'
// 注册一个全局自定义指令 `v-clamp`
Vue.directive('clamp', {
	deep: true,
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el, binding) {
		function clamp(element, options) {
			options = options || {};
			let win = window,
				opt = {
					clamp: options.clamp || {number: 2, size: 16},
					useNativeClamp: typeof(options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true,
					splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
					animate: options.animate || false,
					truncationChar: options.truncationChar || '...',
					truncationHTML: options.truncationHTML
				},

				sty = element.style,
				originalText = element.innerHTML,

				supportsNativeClamp = typeof(element.style.webkitLineClamp) != 'undefined',
				clampValue = opt.clamp.number,
				isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1),
				truncationHTMLContainer;

			if(opt.truncationHTML) {
				truncationHTMLContainer = document.createElement('span');
				truncationHTMLContainer.innerHTML = opt.truncationHTML;
			}

			/**
			 * @param {HTMLElement}
			 * @param {string}
			 * @returns {number}
			 */
			function computeStyle(elem, prop) {
				if(!win.getComputedStyle) {
					win.getComputedStyle = function(el) {
						this.el = el;
						this.getPropertyValue = function(prop) {
							let re = /(\-([a-z]){1})/g;
							if(prop == 'float') prop = 'styleFloat';
							if(re.test(prop)) {
								prop = prop.replace(re, function() {
									return arguments[2].toUpperCase();
								});
							}
							return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
						};
						return this;
					};
				}

				return win.getComputedStyle(elem, null).getPropertyValue(prop);
			}

			function getMaxLines(height) {
				let availHeight = height || element.clientHeight,
					lineHeight = getLineHeight(element);

				return Math.max(Math.floor(availHeight / lineHeight), 0);
			}

			function getMaxHeight(clmp) {
				let lineHeight = getLineHeight(element);
				return lineHeight * clmp;
			}

			function getLineHeight(elem) {
				let lh = computeStyle(elem, 'line-height');
				if(lh == 'normal') {
					lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
				}
				return parseInt(lh);
			}

			let splitOnChars = opt.splitOnChars.slice(0),
				splitChar = splitOnChars[0],
				chunks,
				lastChunk;

			function getLastChild(elem) {
				if(elem.lastChild.children && elem.lastChild.children.length > 0) {
					return getLastChild(Array.prototype.slice.call(elem.children).pop());
				}

				else if(!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue === '' || elem.lastChild.nodeValue == opt.truncationChar) {
					elem.lastChild.parentNode.removeChild(elem.lastChild);
					return getLastChild(element);
				}

				else {
					return elem.lastChild;
				}
			}

			function truncate(target, maxHeight) {
				if(!maxHeight) {
					return;
				}
				function reset() {
					splitOnChars = opt.splitOnChars.slice(0);
					splitChar = splitOnChars[0];
					chunks = null;
					lastChunk = null;
				}
				let nodeValue = target.nodeValue.replace(opt.truncationChar, '');

				if(!chunks) {

					if(splitOnChars.length > 0) {
						splitChar = splitOnChars.shift();
					}

					else {
						splitChar = '';
					}

					chunks = nodeValue.split(splitChar);
				}

				if(chunks.length > 1) {
					lastChunk = chunks.pop();

					applyEllipsis(target, chunks.join(splitChar));
				}

				else {
					chunks = null;
				}


				if(truncationHTMLContainer) {
					target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
					element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
				}

				if(chunks) {
					//It fits
					if(element.clientHeight <= maxHeight) {
						if(splitOnChars.length >= 0 && splitChar !== '') {
							applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
							chunks = null;
						}
						else {
							return element.innerHTML;
						}
					}
				}
				else {
					if(splitChar === '') {
						applyEllipsis(target, '');
						target = getLastChild(element);

						reset();
					}
				}

				if(opt.animate) {
					setTimeout(function() {
						truncate(target, maxHeight);
					}, opt.animate === true ? 10 : opt.animate);
				} else {
					return truncate(target, maxHeight);
				}
			}

			function applyEllipsis(elem, str) {
				elem.nodeValue = str + opt.truncationChar;
			}
			
			function getByteLen(val) {
				let len = 0;
				for (let i = 0; i < val.length; i++) {
					let a = val.charAt(i);
					if(a.match(/[^\x00-\xff]/ig) != null) {
						len += 2;
					}else{
						len += 1;
					}
				}
				return len;
			}

			if(clampValue == 'auto') {
				clampValue = getMaxLines();
			} else if(isCSSValue) {
				clampValue = getMaxLines(parseInt(clampValue));
			}

			let clampedText;
			if(supportsNativeClamp && opt.useNativeClamp) {
				sty.overflow = 'hidden';
				sty.textOverflow = 'ellipsis';
				sty.webkitBoxOrient = 'vertical';
				sty.display = '-webkit-box';
				sty.webkitLineClamp = clampValue;

				if(isCSSValue) {
					sty.height = opt.clamp.number + 'px';
				}
			} else {
				let clientWith = el.clientWidth;
				let len = getByteLen(el.innerText)
				if(len * (opt.clamp.size / 2) / clientWith < opt.clamp.number) return;
				let height = getMaxHeight(clampValue);
				if(height <= element.clientHeight) {
					clampedText = truncate(getLastChild(element), height);
				}
			}

			return {
				'original': originalText,
				'clamped': clampedText
			};
		}

		clamp(el, {
			clamp: binding.value
		})

	}
})
