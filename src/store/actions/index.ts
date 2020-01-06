import { ActionTree } from 'vuex'
import StoreData from '@/store/state'
import axios from '@/axios'
const actions: ActionTree<StoreData, StoreData> = {
  account({ state, commit, getters, dispatch }, value: string) {
    commit('account', value)
  }
}
export default actions
