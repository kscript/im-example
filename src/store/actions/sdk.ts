import { ActionTree } from 'vuex'
import StoreData from '@/store/state'
import { NIM } from '@/utils/sdk'
const actions: ActionTree<StoreData, StoreData> = {
  async login({ state, commit, getters, dispatch }, data: anyObject) {
    let response = await dispatch('api::login', data)
    commit('account', response.data.data.account)
    commit('appKey', response.data.data.appKey)
    commit('token', response.data.data.token)
    commit('isLogin', 1)
    return response.data
  },
  async connect({ state, commit, getters, dispatch }, value) {
    if (state.isLogin !== 1) {
      await dispatch('login')
    }
    let nim = await NIM()
    commit('nim', nim)
    return nim
  }
}
export default actions
