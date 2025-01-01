import { fn } from './module'

fn()

const monitor = {
  init(options = {}) {
    console.log('init', options)
  },
}

export default monitor
