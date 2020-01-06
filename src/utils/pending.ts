// export const Pending = (factors: string[], done: (processed: any[]) => void) => {
//   var resolves: anyObject<Function> = {};
//   Promise.all(factors.map(item => {
//     return new Promise((resolve, reject) => {
//       resolves[item] = resolve;
//     })
//   })).then((...rest) => done(...rest));
//   return resolves;
// }

export class Pending {
  public factors: string[] = []
  public resolves: anyObject<Function> = {}
  public all: Promise<any[]>
  constructor(factors: string[], done: (processed: any[]) => void) {
    this.factors = factors || []
    this.all = <Promise<any[]>>Promise.all(factors.map(item => {
      return new Promise((resolve, reject) => {
        this.resolves[item] = resolve
      })
    }))
    this.all.then((...rest) => done(...rest))
  }
  resolve(factor: string, data: any) {
    if (typeof this.resolves[factor] === 'function') {
      this.resolves[factor](data)
    }
  }
}
export default Pending
