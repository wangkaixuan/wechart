import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  // scrollBehavior () {
  //   return { x: 0, y: 0 }
  // },
  routes: [
    {
      path: '/',
      name: 'list',
      component: resolve => require(['@/pages/judgment/list/list.vue'], resolve),
      meta: {
        title: '舆情研判'
      }
    },
    {
      path: '/judgmentapply',
      name: 'judgmentapply',
      component: resolve => require(['@/pages/judgment/apply/apply.vue'], resolve)
    },
    {
      path: '/openapply',
      name: 'openapply',
      component: resolve => require(['@/pages/judgment/openapply/openapply.vue'], resolve)
    },
    {
      path: '/applywait',
      name: 'applywait',
      component: resolve => require(['@/pages/judgment/wait/wait.vue'], resolve)
    },
    {
      path: '/nobind',
      name: 'nobind',
      component: resolve => require(['@/pages/judgment/nobind/nobind.vue'], resolve)
    },
    {
      path: '/judgmentdetail',
      name: 'judgmentdetail',
      component: resolve => require(['@/pages/judgment/detail/detail.vue'], resolve),
      meta: {
        title: '内容详情'
      }
    },
    {
      path: '/dailyanalysis',
      name: 'dailyanalysis',
      component: resolve => require(['@/pages/judgment/dailyanalysis/dailyanalysis.vue'], resolve),
      meta: {
        title: '舆情研判报告'
      }
    },
    {
      path: '/dailylist',
      name: 'dailylist',
      component: resolve => require(['@/pages/judgment/dailylist/dailylist.vue'], resolve),
      meta: {
        title: '舆情研判日报'
      }
    },
    // {
    //   path: '/',
    //   name: 'judgmentloading',
    //   component: resolve => require(['@/pages/judgment/loading/loading.vue'], resolve),
    //   meta: {
    //     title: '舆情研判'
    //   }
    // },
    {
      path: '/pushwarninglist',
      name: 'pushwarninglist',
      component: resolve => require(['@/pages/pushwarning/list/list.vue'], resolve),
      meta: {
        title: '推送预警'
      }
    },
    {
      path: '/pushwarningdetail',
      name: 'pushwarningdetail',
      component: resolve => require(['@/pages/pushwarning/detail/detail.vue'], resolve),
      meta: {
        title: '内容详情'
      }
    },
    {
      path: '/pushSet',
      name: 'pushSet',
      component: resolve => require(['@/pages/pushwarning/set/pushSet.vue'], resolve),
      meta: {
        title: '通知设置'
      }
    }
  ]
})

// 导航守卫
// router.beforeEach((to, from, next)=>{
//   /*
//   *   是否有openid
//   * */
//   let openid =  to.query.openid || "";
//   let userInfo =  localStorage.getItem('userInfo') || "";
//   console.log(to.name)
//   //预警 研判 日报列表
//   if(openid == "" && (to.name == "list" || to.name == "pushwarninglist" || to.name == "dailylist" || to.name == "pushSet")){
//     console.log("+++++++++++++++++++++++++++++++++++++");
//     //没有获得过用户信息
//     let params = to.query;
//     //获得信息
//     store.dispatch("getUserInfo", params).then(() => {
//       console.log(store.state.userInfo);
//       console.log(store.state.path);
//       if(store.state.path == 'nobind'){
//         console.log("33333333333333333");
//         next({path: store.state.path});
//       }else if(store.state.path !=''){
//         console.log("111111111");
//         console.log(store.state.path == "list");
//         console.log("/?openid="+store.state.userInfo.openid);
//         console.log(store.state.path+"?openid="+store.state.userInfo.openid);
//         console.log(to.name+"?openid="+store.state.userInfo.openid);
//           let hrefs = process.env.NODE_ENV === 'production' ? 'http://wechart-beta.ewrwefg.com/' : 'http://localhost:8080';
//           console.log(hrefs);
//           if(to.name == "list"){
//             console.log("444444444444444")
//            // next({path:"/?openid="+store.state.userInfo.openid});
//             //window.location = hrefs+'?openid='+store.state.userInfo.openid;
//           }else{
//             console.log("55555555555555555555555555555");
//             //window.location = hrefs+to.name+'?openid='+store.state.userInfo.openid;
//             // next({path: to.name+"?openid="+store.state.userInfo.openid});
//           }
//       }else{
//         console.log("22222222222");
//         next();
//       }
//     }).catch(() => {
//       console.log("77777777777777777777777777");
//       next();
//     });
//   }else{
//     console.log("0000000000000000000000");
//     if(process.env.NODE_ENV === 'production'){
//       if(userInfo != ""){
//         store.commit('getUserInfo',JSON.parse(userInfo));
//       }
//     }
//     next();
//   }
// });

router.beforeEach((to, from, next)=>{
    let params = to.query,
        code  = params.code || "",
        openid  = params.openid || "",
        from_name = from.name || "";
    console.log(to);
    console.log(from);
    console.log(to.name);
    console.log(openid);
    console.log(from_name);
    console.log(to.name);
    if(openid !="" && from_name == "" && (to.name == "judgmentdetail" || to.name == "dailyanalysis" || to.name=="pushwarningdetail")){
      console.log("----分享----");
      //分享出去的
      store.commit('getUserInfo', {
        openid:openid,
        code: "",
        examinetype: "",
        dayReportMintime: "",
        endtime: "",
        tel: "",
        judgedState: "",
        who: "",
      });
      next();
    }else{
      if(code !=""){
        store.dispatch("getUserInfo", params).then(() => {
          if(store.state.path == 'nobind' && store.state.userInfo.openid ==""){
            next({path: store.state.path});
          }else if(store.state.path !=''){
            if(to.name == "pushwarninglist" || to.name=="pushSet"){
              next();
            }else{
              if(to.name=="dailylist" && store.state.path=="/"){
                next();
              }else{
                next({path: store.state.path});
              }
            }
          }else{
            console.log("22222222222");
            next();
          }
        }).catch(() => {
          console.log("77777777777777777777777777");
          next();
        });
      }else{
        console.log("0000000000000000000000");
        if (process.env.NODE_ENV === 'production') {
          console.log(store.state.path);
          console.log(store.state.userInfo.openid);
          if(store.state.path == 'nobind' && store.state.userInfo.openid ==""){
            console.log("-=-=-=-=11111111111111111111");
            localStorage.clear();
          }else{
            console.log("dddddddd");
            let userInfo =  localStorage.getItem('userInfo') || "";
            if (userInfo != "") {
              store.commit('getUserInfo', JSON.parse(userInfo));
            }
          }

        }
        next();
      }
    }
});
export default router
