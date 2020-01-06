
import { Component, Prop, Vue } from 'vue-property-decorator'
import style from '@@/App.scss'
@Component
export default class Home extends Vue {
  render() {
    return (<div id="app" class={`${style.test}`}><router-view /></div>)
  }
}
