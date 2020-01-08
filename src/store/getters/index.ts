import StoreData from '@/store/state'

export default {
  account: (state: StoreData): string => {
    return state.account
  },
  appKey: (state: StoreData): string => {
    return state.appKey
  },
  token: (state: StoreData): string => {
    return state.token
  }
}
