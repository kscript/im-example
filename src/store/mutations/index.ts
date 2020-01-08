import { MutationTree } from 'vuex'
import StoreData from '@/store/state'

const mutations: MutationTree<StoreData> = {
  account(state, value: string) {
    state.account = value
  },
  appKey(state, value: string) {
    state.appKey = value
  },
  token(state, value: string) {
    state.token = value
  },
  isLogin(state, value: number) {
    state.isLogin = value
  },
  nim(state, value: anyObject) {
    state.nim = value
  }
}
export default mutations
