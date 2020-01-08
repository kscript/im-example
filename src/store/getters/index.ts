import StoreData from '@/store/state'
import { getLocal, getStore } from '@/utils/localStorage'
export default {
  account: (state: StoreData): string => {
    return getStore(state, 'account')
  },
  appKey: (state: StoreData): string => {
    return getStore(state, 'appKey')
  },
  token: (state: StoreData): string => {
    return getStore(state, 'token')
  }
}
