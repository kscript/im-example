
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {
  render() {
    return (<div class="view-home"><router-view /></div>)
  }
}
