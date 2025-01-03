import { setConfig } from './config'
import error from './error'

const monitor = {
  init(options = {}) {
    // console.log('init', options)
    setConfig(options)
    error()
  },
}

export default monitor
