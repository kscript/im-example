import { MutationTree } from 'vuex'
import StoreData from '@/store/state'
import { setLocal, setStore } from '@/utils/localStorage'

const mutations: MutationTree<StoreData> = {
  account(state, value: string) {
    setStore(state, 'account', value)
  },
  appKey(state, value: string) {
    setStore(state, 'appKey', value)
  },
  token(state, value: string) {
    setStore(state, 'token', value)
  },
  isLogin(state, value: number) {
    setStore(state, 'isLogin', value)
  },
  nim(state, value: anyObject) {
    state.nim = value
  }
}
export default mutations
