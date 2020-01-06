
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Message extends Vue {
  render() {
    return (<div class="view-message"></div>)
  }
}
