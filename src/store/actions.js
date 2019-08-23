import { getOpenId } from '@/api/judgment'

export default {
  getUserInfo({commit},params){
    return new Promise((resolve,reject) =>{
      getOpenId(params).then(res =>{
        console.log("--------------------------------");
        console.log(res);
        if(res.data){
          let datas = res.data;
          commit('getUserInfo',datas);
        }else{
          console.log("访问错误");
        }
        resolve();
      }).catch(err => {
        console.log("===============================");
        console.log(err);
        reject(err);
      });
    })
  },
}
