import { nSQL } from "nano-sql";
import store from '@/store';
type where = string[] | string[][] | Function;
export class DB {
  public active: Promise<anyObject> | null = null;
  public account: string = '';
  public option: anyObject = {};
  public data: anyObject = {};
  public key: string = '';
  public nSQL = nSQL;
  constructor(key: string = 'to'){
    this.key = key;
  }
  // 以下方法中, 只有connect方法是必要的
  // 其它方法在查询数据库前都应该先调用 connect 方法
  // let db = await this.connect();
  // db....
  async connect(account?: string, option?: anyObject):Promise<anyObject> {
    account = account || store.getters.account;
    if (account) {
      if (account === this.account) {
        // 实例已存在
        return <Promise<anyObject>>this.active;
      }
    } else {
      if (this.account == '') {
        throw '请设置账号!';
      }
    }
    account = this.account = account || this.account;
    // 0参数调用时, 如果当前已存在有实例, 使用该实例
    return this.active = this.active || new Promise((resolve) => {
      nSQL('im')
      .model([
        {key: 'id', type: 'int', props: ['pk()', 'ai()']}, // 自增
        {key: 'time', type: 'int' },
        {key: 'to', type: 'string'},
        {key: 'from', type: 'string'},
        {key: 'more', type: 'map'},
      ])
      .config({
        // Safari 浏览器使用PERM模式可能存在问题, 指定为 IDB 即可
        // https://github.com/ClickSimply/Nano-SQL/issues/115#issuecomment-459042646
        mode: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) ? 'IDB' : 'PERM',
        history: true
      })
      .connect()
      .then(() => {
        resolve(nSQL('im'));
      });
    })
  }
  async update(option: anyObject = {}, filter: Function) {
    let res = await this.select([], filter);
    if (res.length) {
      let query = await this.query('upsert', option, false);
      return query.where(filter).exec();
    } else {
      return await this.query('upsert', option);
    }
  }
  async upsert(option: anyObject = {}) {
    return await this.query('upsert', option);
  }
  async select(option: anyObject = [], where?: where) {
    let sql = await this.query('select', option, !where);
    return !where ? sql : await sql.where(where).exec();
  }
  /**
   * 查询数据库
   * @param type {string} 操作类型 upsert/select
   * @param option {object|array} 操作信息, 操作类型为upsert时: 表示插入的数据, select时: 选取的字段
   * @param where {string[]|string[][]|Function=} 限定条件. 可选项
   * @param isExec {boolean=true} 是否需要链式调用exec方法, 默认为需要
   */
  async query(...rest: any[]) {
    let exec = true;
    let db = await this.connect();
    // 最后一个参数为false时, 不执行exec函数
    if (rest.length && rest[rest.length - 1] === false) {
      exec = false;
    }
    return exec ? await db.query(...rest).exec() : await db.query(...rest);
  }
}

export default DB;
