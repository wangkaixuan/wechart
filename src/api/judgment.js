import { fetch } from "@/helpers/fetch"; //引用fetch.js
/**
 * get
 * -------------------------------------获取openid---------------------------------------------
 *  code 返回的code
 *  type 返回的type
 */
export function getOpenId(data) {
    return fetch({
        url: '/api/wechat/getOpenid',
        // url: '/qsapi/wechat/getOpenid',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------获取研判模块基本信息---------------------------------------------
 *  openid
 */
export function getJudgedInfo(data) {
    return fetch({
        url: '/api/wechat/getJudgedInfo',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------详情页面信息---------------------------------------------
 *  id 信息uuid
 *  openid
 */
export function getDetailsInfo(data) {
    return fetch({
        url: '/api/wechat/getDetailsInfo',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------详情页面相同信息------------------------------------------
 *  pageNum  页码
 *  pageSize 每页条数
 *  simhash  信息simhash
 *	uuid  信息id
 *  openid
 */
export function getSameWarningList(data) {
    return fetch({
        url: '/api/wechat/getSameWarningList',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——申请试用——申请开通
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  uid   用户id
 *  who   用户名称
 *  tel  联系电话
 *  openid
 */
export function submitApply(data) {
    return fetch({
        url: '/api/wechat/applyForJudged',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——列表接口——删除
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  id                 信息uuid
 *  openid             
 */
export function deleteBatchWarning(data) {
    return fetch({
        url: '/api/wechat/deleteBatchWarning',
        method: 'get',
        params: data
    })
}

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
export function getJudgedList(data) {
  return fetch({
    url: '/api/wechat/getJudgedList',
    method: 'get',
    params: data
  })
}
/**
 * get
 * -------------------------------------获取日报统计概述------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid   openid
 */
export function getDayReportSummary(data) {
    return fetch({
        url: '/api/wechat/getDayReportSummary',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------获取预警级别统计------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid   openid
 */
export function getWarningLevelStatistics(data) {
    return fetch({
        url: '/api/wechat/getWarningLevelStatistics',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------获取媒体分类统计------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid   openid
 */
export function getSourceTypeStatistics(data) {
    return fetch({
        url: '/api/wechat/getSourceTypeStatistics',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------获取倾向性统计------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid   openid
 */
export function getOriStatistics(data) {
    return fetch({
        url: '/api/wechat/getOriStatistics',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------获取活跃网站统计------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid   openid
 */
export function getActiveWebStatistics(data) {
    return fetch({
        url: '/api/wechat/getActiveWebStatistics',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------获取活跃网民统计------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid   openid
 */
export function getActiveAuthorStatistics(data) {
    return fetch({
        url: '/api/wechat/getActiveAuthorStatistics',
        method: 'get',
        params: data
    })
}
/**
 * get
 * -------------------------------------获取重点舆情------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid   openid
 *  pageSize   pageSize
 *  pageNum   pageNum
 */
export function getKeyPublicOpinion(data) {
    return fetch({
        url: '/api/wechat/getKeyPublicOpinion',
        method: 'get',
        params: data
    })
}

/**
 * get
 * -------------------------------------获取日报验证接口------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 */
export function getJudgedInfoCount(data) {
  return fetch({
    url: '/api/wechat/getJudgedInfoCount',
    method: 'get',
    params: data
  })
}
/**
 * get
 * -------------------------------------复制信息记录操作日志------------------------------------------
 * 复制链接或信息日志
 *
 * @param openid
 * @param uuid 信息id
 * @param userid 用户id
 * @param infoType 1 专题 、2预警、3舆情研判微信端 、4推送预警微信端
 * @param operationUserIp 操作人IP
 * @param operationUserId 操作人id
 * @param operationUserName 操作人名称
 * @param functionType 功能类型 1复制链接 2复制信息
 * @return
 */
export function saveCopyLink(data) {
  return fetch({
    url: '/api/wechat/saveCopyLink',
    method: 'get',
    params: data
  })
}
/**
 * get
 * -------------------------------------获取涉事分类统计------------------------------------------
 *  bTime    开始时间
 *  eTime    结束时间
 *  openid
 */
export function getClassfyStatistics(data) {
  return fetch({
    url: '/api/wechat/getClassfyStatistics',
    method: 'get',
    params: data
  })
}
