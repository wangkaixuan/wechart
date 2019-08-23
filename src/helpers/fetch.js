/* eslint-disable */
import axios from 'axios'; //引入axios
import store from '@/store'
export function fetch(options) {
  if(options.method == "get"){
    if(typeof options.params == "object"){
      options.params.openid = store.state.userInfo.openid;
    }else{
      options.params ={
        openid:store.state.userInfo.openid
      }
    }

  }
  if(options.method == "post"){
    if(typeof options.data == "object"){
      options.data.openid = store.state.userInfo.openid;
    }else{
      options.data ={
        openid:store.state.userInfo.openid
      }
    }
  }
	return new Promise((resolve, reject) => {
		const instance = axios.create({ //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
			//所有的请求都会带上这些配置，比如全局都要用的身份信息等。
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			timeout: 120 * 1000 // 120秒超时
		});
		instance(options)
			.then(response => { //then 请求成功之后进行什么操作
				resolve(response); //把请求到的数据发到引用请求的地方
			})
			.catch(error => {
				if(error.message.indexOf('401') > -1) {
					localStorage.clear();
				}
        reject(error);//失败执行函数
			});
	});
}
