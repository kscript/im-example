import { Vue, Component, Watch } from 'vue-property-decorator'
import store from '@/store'
import busData from '@/eventBus/data'
// 管理全局的一些方法
// 会与 index 中的方法混合, 添加方法时, 请在 index 'vue/types/vue' 模块定义里, 添加该方法的类型描述
@Component
export default class Methods extends Vue {
  public selectSession(current: string) {
    console.log([
      busData.uid,
      busData.mode,
      store.state.account
    ])
    busData.current = current
    this.$nextTick(() => {
      console.log([
        busData.uid,
        busData.mode,
        store.state.account
      ])
    })
  }
}
