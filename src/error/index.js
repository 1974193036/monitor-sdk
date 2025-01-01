import { getConfig } from '../config'

export default function error() {
  const config = getConfig()

  // 资源错误没有冒泡，所以只能在捕获阶段采集获取错误
  window.addEventListener('error', (event) => {
    // console.log('error', event)
    const target = event.target
    // 要判断是资源错误，还是js错误，很简单，直接判断事件对象有没有src或者href属性就可以了
    if (target && (target.src || target.href)) {
      console.log('资源错误')
      // 上报资源错误 todo...
    }
    else {
      console.log('js错误')
      // 上报js错误 todo...
    }
  }, true)

  // promise错误
  window.addEventListener('unhandledrejection', (event) => {
    console.log('promise错误')
    console.log(event)
    // 上报promise错误 todo...
  })

  // vue错误
  if (config.vue?.Vue) {
    const { Vue } = config.vue
    Vue.config.errorHandler = function (err, vm, info) {
      console.log('vue错误', err, vm, info)
      // 上报vue错误 todo...
    }
  }
}
