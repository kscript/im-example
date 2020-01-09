import Vue from 'vue'
const set = (obj: anyObject, key: string, val: any) => {
  Vue.set(obj, key, val)
}
const clear = (obj: anyObject) => {
  for (let k in obj) {
    Vue.delete(obj, k)
  }
}
// mapList 在页面里渲染时, list 依赖 map 里的数据, 因此
// 添加时, 设置map -> push进list
// 删除时, 从list里删除 -> 从map里删除

export class MapList {
  public key: string
  public name: string
  public map: anyObject = {}
  public list: string[] = []
  public info: anyObject = {}
  public mode: string = 'default'
  constructor(data: anyObject[], key: string = 'key', name: string = '') {
    let map: anyObject = {}
    let list: string[] = []
    data.forEach((item) => {
      let value = item[key]
      list.push(value)
      map[value] = item
    })
    this.key = key
    this.name = name
    set(this, 'map', map)
    Vue.set(this, 'list', list)
  }
  public length() {
    return this.list.length
  }
  beforeUpdate(data: anyObject, key: string = this.key, mode: string = 'default', done: Function): void {
    done()
  }
  async basicUpdate(data: anyObject, key: string = this.key, change: boolean = true) {
    let mapKey = data[key]
    if (!mapKey) {
      console.trace('对象数据结构不符合要求', data, key, this.name)
    }
    if (!this.map[mapKey]) {
      set(this.map, mapKey, data)
      change && this.list.push(mapKey)
    } else {
      set(this.map, mapKey, data)
      if (change) {
        let index = this.list.indexOf(mapKey)
        if (index < 0) {
          this.list.push(mapKey)
        } else {
          this.list.splice(index, 1)
          this.list.unshift(mapKey)
        }
      }
    }
    return this
  }
  async update(data: anyObject, key: string = this.key, change: boolean = true, mode: string = 'custom') {
    return new Promise((resolve, reject) => {
      this.beforeUpdate(data, key, mode, () => {
        this.basicUpdate(data, key, change)
        resolve(this)
      })
    }).catch((err: Error) => {
      console.log(err)
    })
  }
  async updateList(datas: anyObject[], key: string = this.key, change: boolean = true, mode: string = 'custom') {
    return Promise.all((datas || []).map(item => {
      this.update(item, key, change, mode)
      return item
    }))
  }
  async unshift(data: anyObject, key: string = this.key, mode: string = 'default') {
    return new Promise((resolve, reject) => {
      this.beforeUpdate(data, key, mode, (newData: undefined | anyObject) => {
        if (newData !== void 0) {
          data = newData
        }
        let mapKey = data[key]
        let index = this.list.indexOf(mapKey)
        if (!mapKey) {
          console.trace('对象数据结构不符合要求', data, key, this.name)
          return this
        }
        set(this.map, mapKey, data)
        ~index && this.list.splice(index, 1)
        this.list.unshift(mapKey)
        resolve(this)
      })
    }).catch((err: Error) => {
      console.log(err)
    })
  }
  async push(data: anyObject, key: string = this.key) {
    await this.update(data, key)
    return this
  }
  async splice(num: number, len: number, key: string = this.key, mode: string = 'default', ...rest: anyObject[]) {
    return new Promise((resolve, reject) => {
      if (len) {
        Promise.all(rest.map((item, index) => {
          let mapKey = item[key]
          this.beforeUpdate(item, key, mode, () => {
            set(this.map, mapKey, item)
            this.list.splice(index + num, 1, mapKey)
          })
        })).then(() => {
          resolve(this)
        })
      } else {
        resolve(this)
      }
    }).catch((err: Error) => {
      console.log(err)
    })
  }
  beforeRemove(data: anyObject, key: string = this.key, done: Function): void {
    done()
  }
  async remove(data: anyObject, key: string = this.key, del: boolean = true) {
    return new Promise((resolve, reject) => {
      this.beforeRemove(data, key, () => {
        let mapKey = data[key]
        let index = this.list.indexOf(mapKey)
        if (~index) {
          this.list.splice(index, 1)
          del && Vue.delete(this.map, mapKey)
        }
        resolve(this)
      })
    }).catch((err: Error) => {
      console.log(err)
    })
  }
  async removeBykey(mapKey: string, del: boolean = true) {
    return new Promise((resolve, reject) => {
      this.beforeRemove(this.map[mapKey], this.key, () => {
        let index = this.list.indexOf(mapKey)
        if (~index) {
          this.list.splice(index, 1)
          del && Vue.delete(this.map, mapKey)
        }
        resolve(this)
      })
    }).catch((err: Error) => {
      console.log(err)
    })
  }
  has(mapKey: string) {
    if ((this.mode === 'map' || this.mode === 'default') && !!(this.map[mapKey] || {})[this.key]) {
      return this.list.indexOf(mapKey) >= 0
    }
    return false
  }
  get(mapKey?: string) {
    return mapKey && this.map[mapKey] || null
  }
  attrInfo(key?: string, val?: any) {
    if (key) {
      if (val) {
        Vue.set(this.info, key, val)
      } else {
        return this.info[key]
      }
    } else {
      return this.info
    }
  }
  deleteInfo(key?: string) {
    if (key) {
      Vue.delete(this.info, key)
    } else {
      Vue.set(this, 'info', {})
    }
    return this
  }
  changeList(list: string[]) {
    this.mode = 'map'
    Vue.set(this, 'list', list)
    return this
  }
  changeMap(map: anyObject) {
    this.mode = 'list'
    Vue.set(this, 'map', map)
    return this
  }
  forEach(func: (value: string, index: number, array: string[]) => void) {
    this.list.forEach(func)
    return this
  }
  sort(executor: (a: anyObject, b: anyObject) => number) {
    this.list.sort((a: string, b: string) => {
      return executor(this.map[a], this.map[b])
    })
    return this
  }
  clear() {
    this.clearList()
    this.clearMap()
    clear(this.info)
    return this
  }
  clearList() {
    this.list.splice(0)
    return this
  }
  clearMap() {
    clear(this.map)
    return this
  }
}
export default MapList
