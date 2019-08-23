import { saveCopyLink } from '@/api/judgment'

// eslint-disable-next-line no-unused-vars
export default {
  getUserInfo:(state,datas) =>{
    if(datas.code == "1001001"){
      //有绑定秘书账号
      state.path = "nobind";
    }else if(datas.code == "1001002"){
      console.log(datas.messge);
    }else{
      state.userInfo = datas || [];
      let code = datas.code || "0";
      let judgedState = datas.judgedState || "0";
      /*  code 值意思
          0 没有申请过
          1 开通人工预警  examinetype  '审核状态 0未审核 1通过 2未通过'
          2 申请过    examinetype  '审核状态 0未审核 1通过 2未通过'
      */
      if(judgedState == 1){
        //开通舆情研判
        if(code == 0){
          //申请开通
          state.path = "judgmentapply";
        }else if(code == 1){
          //列表
          state.path = "/";
        }else if(code == 2){
          if(datas.examinetype == 0){
            state.path = "applywait";
          }else if(datas.examinetype == 1){
            state.path = "/";
          }else if(datas.examinetype == 2){
            state.path = "judgmentapply";
          }
        }
      }else{
        //没有开通舆情研判
        state.path = "nobind";
      }

      localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
    }
  },
  setOpenInfo(state,datas){
    state.weixinCodeInfo = datas;
    localStorage.setItem('judgmentJson',JSON.stringify(datas));
  },
  //复制信息记录操作日志
  saveCopyInfo(state, params){
    let map = {
      // openid: '',
      uuid: params.uuid,
      userid: '',
      infoType: params.infoType, //1 专题 、2预警、3舆情研判微信端 、4推送预警微信端
      operationUserIp: '', 
      operationUserId: '', 
      operationUserName: '', 
      functionType: '2',  //1复制链接 2复制信息
    };
    //记录操作日志
    saveCopyLink(map).then(function(res) {
      //不做任何处理
    }).catch(err => {
      console.log(err, '请求失败！');
    });
  }
}
