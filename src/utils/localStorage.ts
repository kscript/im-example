import Vue from 'vue'
import StoreData from '@/store/state'
import config from '@/config';
const storage = window.localStorage;

/**
 * 保存到本地
 * @func
 * @param {string} key key
 * @param {any} data value
 */
export const setLocal = (key: string, data: any): void => {
  if (data instanceof Object) {
    data = JSON.stringify(data);
  }
  storage.setItem(config.localStorage.pre + key, data);
}

/**
 * 获取本地数据
 * @func
 * @param {string} key key
 */
export const getLocal = (key: string): anyObject | string => {
  let data = storage.getItem(config.localStorage.pre + key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
    }
  }
  return data || '';
}

/**
 * 获取store + 本地localstorage数据
 * @func
 * @param {object} state store.state
 * @param {string} key key
 */
export const getStore = (state: StoreData, key: string): any => {
  return state[key] === void 0 || isEmpty(state[key]) ? getLocal(key) : state[key];
}

/**
 * 保存到store
 * @func
 * @param {object} state store.state
 * @param {string} key key
 * @param {any} val 要保存的数据
 */
export const setStore = (state: StoreData, key: string, val: any): StoreData => {
  Vue.set(state, key, val);
  setLocal(key, val);
  return state;
}

/**
 * 对象是否为空
 * @func
 * @param {object} obj 对象
 */
export const isEmpty = (obj: anyObject): boolean => {
  if (obj instanceof Object) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 清除当前项目用到的本地存储
 * @func
 */
export const clearLocal = () => {
  for (let key in storage) {
    let pre = key.slice(0, config.localStorage.pre.length);
    let unread = key.slice(0, config.localStorage.preUnread.length);
    if (pre === config.localStorage.pre && unread !== config.localStorage.preUnread) {
      storage.removeItem(key);
    }
  }
}

export default {
  isEmpty,
  getLocal,
  setLocal,
  getStore,
  setStore,
  clearLocal
}
