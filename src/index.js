import { autoTracker, tracker } from './action'
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
  },
  tracker,
}

export default monitor
