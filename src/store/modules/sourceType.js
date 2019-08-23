import { getSourceList } from '@/api/public'

const sourceType = {
  state: {
    sourcetype: []
  },
  mutations: {
    getAllSourceType:(state,datas) =>{
      state.sourcetype = datas;
    }
  },
  actions: {
    getAllSourceType({commit}){
      return new Promise((resolve,reject) =>{
        console.log("------------------------")
        getSourceList().then(res=>{
          if(res.data.result.data && res.data.result.data.length > 0){
            commit('getAllSourceType',res.data.result.data)
          }
          resolve();
        }).catch(err=>{
          reject(err);
        })
      })
    }
  }
};

export default sourceType
