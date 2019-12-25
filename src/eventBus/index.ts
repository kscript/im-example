import { Component, Vue, Watch } from 'vue-property-decorator'
import store from '@/store'
import busData from '@/eventBus/data'
import busEvents from '@/eventBus/events'
import busMethods from '@/eventBus/methods'

// 用于给一些混入的方法定义类型描述, 备查~
// 混入多个实例时, 注意划分, 便于看出来源
declare module 'vue/types/vue' {
  interface Vue {
    // methods
    selectSession(current: string): void
    // ...
  }
}

@Component({
  mixins: [
    busEvents,
    busMethods
  ]
})
export class Bus extends Vue {
  public init () {
    setTimeout(() => {
      this.$emit('init', 'world')
    }, 5e3)
  }
  protected created () {
    this.init()
    this.selectSession('pre_test123')
  }
}
export const eventBus = new Bus()
export default {
  install () {
    Vue.prototype.$bus = eventBus
  }
}
