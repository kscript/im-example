import { MutationTree } from 'vuex'
import StoreData from '@/store/state'

const mutations: MutationTree<StoreData> = {
  account (state, value: string) {
    state.account = value
  }
}
export default mutations
