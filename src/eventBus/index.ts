import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({
})
export class Bus extends Vue {
  protected created () {
    this.$on('init', (name: string) => {
      console.log(`hello ${name}`)
    })
    setTimeout(() => {
      this.$emit('init', 'world')
    }, 5e3)
  }
}
export const eventBus = new Bus();
export default {
  install () {
    Vue.prototype.$bus = eventBus;
  }
}
