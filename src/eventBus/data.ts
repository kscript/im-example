import { Vue, Component, Watch } from 'vue-property-decorator'
import store from '@/store'
// 管理全局的数据
// 属性, 计算属性, 监听数据变动

// 当前实例是按需引用, 默认并不与eventBus混合
// 因此这里监听的数据变动, 应该是 A数据 -> B数据 = C数据, 即: 不需要调用 eventBus 相关方法的数据变动
// 复杂的数据变动, 建议在 eventBus 中监听
@Component
export class BusData extends Vue {
  // 属性
  public mode: string = 'list'
  public current: string = ''
  // 计算属性
  get uid () {
    return (/_/.test(this.current) ? this.current.split('_')[1] : store.state.account) || ''
  }
  // 监听数据变动
  @Watch('current', { immediate: true })
  currentChange (val: string, oldVal: string) {
    this.mode = val ? 'chat' : 'list'
    store.commit('account', val)
  }
}
export default new BusData()
