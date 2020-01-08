import store from '@/store'
let retry = 5
let mode = 'sdk'
const nims: anyObject = {}
export const SDK = () => {
  let win: anyObject = window
  if (win && win.SDK) {
    mode = 'sdk'
    return win.SDK.NIM
  }
  if (win && win.NIM) {
    mode = 'nim'
    return win.NIM
  }
  throw (new Error('缺少SDK'))
}
export const NIM = (userConfig?: anyObject) => {
  let nim: anyObject = {}
  let config = userConfig || {}
  let { account, appKey, token } = store.getters;
  let option = { account, appKey, token, ...config };
  if (store.state.iskicked && account === store.state.nim.account) {
    return store.dispatch('reconnect')
  }
  nims[account] =
    // 没传参数时, 如果已有实例, 直接使用
    !userConfig && nims[account]
      ? nims[account]
      : new Promise((resolve, reject) => {
        const defaultOption = {
          db: false,
          debug: false,
          // syncFriends: true,
          // syncFriendUsers: true,
          needMsgReceipt: true,
          syncMsgReceipts: true,
          syncSessionUnread: true,
          syncRoamingMsgs: true,
          syncRelations: true,
          syncBroadcastMsgs: true,
          // needReconnect: true,
          autoMarkRead: false,
          syncTeams: false,
          syncTeamMembers: false,
          syncExtraTeamInfo: false
        }
        // 在sdk实例的回调添加一些统一的逻辑
        const strategy: anyObject<Function> = {
          async onerror(err: anyObject) {
            if (err.code === 302) {
              if (retry--) {
                // await store.dispatch('getToken', { account, token })
                resolve(NIM(userConfig))
              } else {
                reject(err)
              }
            } else {
              reject(err)
            }
          },
          ondisconnect(data: anyObject) {
            // if (data.code === 'kicked') {
            //   store.commit('iskicked', 1)
            // } else {
            this.onerror(data)
            // }
          },
          onconnect() {
            retry = 5;
            resolve(nim)
          }
        }
        // 返回一个包装过的回调函数
        const mixins = (type: string) => {
          return (data: anyObject & Error) => {
            typeof config[type] === 'function' && config[type](data)
            typeof strategy[type] === 'function' && strategy[type](data)
          }
        }
        const result = Object.assign(
          defaultOption,
          option,
          {
            onconnect: mixins('onconnect'),
            ondisconnect: mixins('ondisconnect'),
            onerror: mixins('onerror')
          }
        )
        nim = SDK().getInstance(result)
        store.commit('nim', nim)
      })
  return nims[account]
}
export default {
  SDK,
  NIM
}
