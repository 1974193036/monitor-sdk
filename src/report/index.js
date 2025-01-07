import { getConfig } from '../config'
import { addCache, clearCache, getCache } from '../util/cache'
import getUniqueID from '../util/getUniqueID'

/**
 * 由于我们有很多内容需要上报，
 * 所以我这里为了简单区分和上报
 * 用type来区分上报的内容是什么
 * @param {string} type 上报类型 “error” | "action" | "behavior" | "api" | "performance"
 * @param {object} data 上报信息
 * @param {boolean} isImmediate 是否立即上报，默认为false
 */
export function report(type, data, isImmediate = false) {
  const config = getConfig()

  if (!config.reportUrl) {
    console.error('reportUrl is not set')
    return
  }

  const reportData = JSON.stringify({
    id: getUniqueID(),
    appId: config.appId,
    userId: config.userId,
    currentTime: Date.now(),
    type, // 上报类型
    data, // 上报信息
    currentPage: window.location.href,
    ua: config.ua,
  })

  // console.log('reportData', reportData)

  // 立即上传
  if (isImmediate) {
    sendBeacon(config.reportUrl, reportData)
  }

  // 浏览器空闲时间进行上报
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      sendBeacon(config.reportUrl, reportData)
    }, { timeout: 3000 })
  }
  else {
    setTimeout(() => {
      sendBeacon(config.reportUrl, reportData)
    })
  }
}

let timer = null
// 延迟上传,一定时间之后再进行上传
export function lazyReportCache(type, data, timeout = 3000) {
  addCache(type, data)

  clearTimeout(timer)
  timer = setTimeout(() => {
    const cache = getCache()
    if (cache && cache.size) {
      for (const [type, data] of cache) {
        // console.log(type, data) // error [xxx,xx,xx], api [xx,xx,xx]
        report(type, data)
      }
      clearCache()
    }
  }, timeout)
}

function sendBeacon(reportUrl, reportData) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(reportUrl, reportData)
  }
  else {
    reportWithXHR(report)
  }
}

function reportWithXHR(reportUrl, reportData) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', reportUrl, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(reportData)
}
