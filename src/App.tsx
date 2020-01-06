import '@@/App.scss'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {
  render() {
    return (<div id="app"><router-view /></div>)
  }
}
