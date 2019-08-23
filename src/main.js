import Vue from 'vue';
import App from './App.vue';
import router from '@/router'
import store from '@/store'
import Es6Promise from 'es6-promise';
import filters from '@/filters/index.js'

import FastClick from 'fastclick'
import '@/assets/styles/index.css'
// import moment from 'moment'
import 'moment/locale/zh-cn'
import VConsole from 'vconsole/dist/vconsole.min.js'

import 'lib-flexible';
import 'babel-polyfill';
import '@/helpers/fastclick';

FastClick.attach(document.body);

let vConsole = new VConsole();
export default vConsole;

Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

Es6Promise.polyfill()
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // next();

  let userAgent = navigator.userAgent || '';
  // let isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
  let isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  if (isIOS && to.path !== location.pathname) {
    // 此处不可使用location.replace
    location.assign(to.fullPath);
  } else {
    next();
  }
});
String.prototype.getAbstract = function () {
    let  s = this.replace();
    let charLength = 200;
    let maxLength = 300;
    let subKvAbstract = '';                   //前200字符
    let subHvAbstract = '';                   //后面200字符
    let subHzAbstract = '';                   //200后需要字符串
    let suffx = ["。","？", "！", "；", "，"];
    if(s && s.length > charLength){
        subKvAbstract = s.substr(0,charLength);
        subHvAbstract = s.substr(charLength,s.length-1);
        for(let i in suffx){
            let loc = subHvAbstract.indexOf(suffx[i]);
            if(loc != -1 && (loc < subHzAbstract.length || subHzAbstract == '')){
                //判断位置小并且复制;
                subHzAbstract = subHvAbstract.substr(0,loc);
            }
        }
        s = subKvAbstract+subHzAbstract;
        if(s.length > maxLength){
            let subKv = '';
            //判断大于300
            for(let i in suffx){
                let loc = subKvAbstract.lastIndexOf(suffx[i]);
                if(loc != -1 && (subKv == '' || loc > subKv.length)){
                    subKv = subKvAbstract.substr(0,loc);
                }
            }
            s = subKv;
        }
    }
    return s;
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


