import { autoTracker, tracker } from './action'
import api from './api'
import { onVueRouter, pageChange, pageStayTime, pv } from './behavior'
import { setConfig } from './config'
import error from './error'
import performance from './performance'

const monitor = {
  init(options = {}) {
    // console.log('init', options)
    setConfig(options) // 配置全局参数
    error()// 错误监听处理
    performance() // 性能监听处理
    autoTracker()// 自动埋点
    pv() // page view
    api() // api远程请求数据采集
  },
  tracker,
  pageStayTime,
  pageChange,
  onVueRouter,
}

export default monitor
