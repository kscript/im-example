import { ActionTree } from 'vuex'
import StoreData from '@/store/state'
import axios from '@/axios'
import { NIM } from '@/utils/sdk'
const actions: ActionTree<StoreData, StoreData> = {
  'api::login'({ state, commit, getters, dispatch }, value: string) {
    return axios({
      url: '/login',
      method: 'POST',
      data: {}
    })
  }
}
export default actions
