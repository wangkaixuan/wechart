/*  code 值意思
    0 没有申请过
    1 开通人工预警  examinetype  '审核状态 0未审核 1通过 2未通过'
    2 申请过    examinetype  '审核状态 0未审核 1通过 2未通过'
*/
const judgment = {
    state: {
        path:'',                 //跳转地址
        endtime:'',              //结束日期
        who:'',                  //名称
        tel:'',                  //手机号
        examinetype:'',          //处理中值   0未审核 1通过 2未通过'
    },
    mutations: {
        setInfo(state,datas){
            datas = JSON.parse(datas);
            state.endtime = datas.endtime || "";
            state.who = datas.who || "";
            state.tel = datas.tel || "";
            state.examinetype = datas.examinetype;
            state.path = datas.path;
        }
    },
    actions: {
        setInfo({commit},info){
            commit('setInfo',info);
        }
    }
};
export default judgment
