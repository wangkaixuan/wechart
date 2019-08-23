import { fetch } from "@/helpers/fetch"; //引用fetch.js


/**
 * 舆情研判——获取舆情研判列表页
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * openid
 * sourceType 来源类型 逗号分隔
 * orientation 倾向性 逗号分隔
 * bTime 开始时间
 * eTime 结束时间
 * time 时间 eg:7day 7天； 24hour 24小时
 * warningLevel 预警级别
 * isRead 0未读 1已读
 * isOcr 是否仅看图片识别 0否 1是
 * pageSize 每页条数
 * pageNum 页码
 */
export function getPushwarningList(data) {
  return fetch({
    url: '/api/wechat/getPushWarningList',
    method: 'get',
    params: data
  })
}

/** 获取推送预警
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * openId
 */
export function getDisturbanceFreeTime(data) {
  return fetch({
    url: '/api/wechat/getDisturbanceFreeTime',
    method: 'get',
    params: data
  })
}

/** 推送预警更改设置
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * bTime  开始时间
 * eTime  结束时间
 * isOpen  是否开启
 */
export function updateDisturbanceFreeTime(data) {
  return fetch({
    url: '/api/wechat/updateDisturbanceFreeTime',
    method: 'get',
    params: data
  })
}
