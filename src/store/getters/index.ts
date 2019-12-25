import StoreData from '@/store/state'

export default {
  account: (state: StoreData): string => {
    return state.account
  }
}
