export class Deferred {
    constructor() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
  
      this.then = this.promise.then.bind(this.promise)
      this.catch = this.promise.catch.bind(this.promise)
    }
    // tslint:disable-next-line
    resolve = result => {}
    // tslint:disable-next-line
    reject = err => {}
    then = value => {
      throw new Error("Not implemented yet")
    }
    catch = err => {
      throw new Error("Not implemented yet")
    }
  }
  