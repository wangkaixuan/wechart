import FastClick from 'fastclick';

//使用fastclick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

/*当使用FastClick 时，input框在ios上点击输入调取手机自带输入键盘不灵敏，有时候甚至点不出来。而安卓上完全没问题。
这个原因是因为FastClick的点击穿透。解决方法：*/
FastClick.prototype.onTouchEnd = function (event) {
  if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "text") {
    event.preventDefault();
    return false;
  }
};
/*fastclick input 点击框输入失效， 需要点击两次 iso 11.3*/
FastClick.prototype.focus = function (targetElement) {
  targetElement.focus();
};