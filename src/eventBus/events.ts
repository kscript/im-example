import { Vue, Component, Watch } from 'vue-property-decorator'
// 管理全局的事件订阅
// 所有的全局事件订阅放在 created 生命周期钩子即可
@Component
export default class Events extends Vue {
  protected created () {
    this.$on('init', (name: string) => {
      console.log(`hello ${name}`)
    })
  }
}
