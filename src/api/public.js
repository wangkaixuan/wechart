import { fetch } from "@/helpers/fetch"; //引用fetch.js

/**
 *  获得媒体类型
 * -------------------------------------传入的参数---------------------------------------------
 * openid        openid
 *
 */
export function getSourceList(data) {
  return fetch({
    url: '/api/wechat/getAllSourceType',
    method: 'get',
    params: data
  })
}
