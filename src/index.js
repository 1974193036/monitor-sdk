import { autoTracker, tracker } from './action'
import { onVueRouter, pageChange, pageStayTime, pv } from './behavior'
import { setConfig } from './config'
import error from './error'
import performance from './performance'

const monitor = {
  init(options = {}) {
    // console.log('init', options)
    setConfig(options)
    error()
    performance()
    autoTracker()
    pv()
  },
  tracker,
  pageStayTime,
  pageChange,
  onVueRouter,
}

export default monitor
