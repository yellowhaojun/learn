const isFunction = variable => typeof variable === 'function'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) throw new Error('MyPromise接收的参数必须是函数')
    this._status = PENDING
    this._value = undefined
    this._fulfilledQueues = [] // 成功回调函数队列
    this._rejectedQueues = [] // 失败回调函数队列
    const resolve = this._resolve.bind(this)
    const reject = this._reject.bind(this)
    try {
      handle(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  _resolve (val) {
    const run = () => {
      if (this._status !== PENDING) return
      this._status = FULFILLED
      const runFulfilled = (value) => {
        let cb
        while ((cb = this._fulfilledQueues.shift())) {
          cb(value)
        }
      }
      const runRejected = (error) => {
        let cb
        while ((cb = this._rejectedQueues.shift())) {
          cb(error)
        }
      }

      if (val instanceof MyPromise) {
        val.then(
          value => {
            this._value = value
            runFulfilled(value)
          },
          error => {
            this._value = error
            runRejected(error)
          }
        )
      } else {
        this._value = val
        runFulfilled(val)
      }
    }
    setTimeout(run, 0)
  }

  _reject (err) {
    if (this._status !== PENDING) return

    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb
      while ((cb = this._rejectedQueues.shift())) {
        cb(err)
      }
    }
    setTimeout(run, 0)
  }

  then (onFulfilled, onRejected) {
    const { _status, _value } = this
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 成功时执行函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            const res = onFulfilled(value)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (error) {
          onRejectedNext(error)
        }
      }

      // 失败时执行函数
      let rejected = err => {
        try {
          if (!isFunction(err)) {
            onRejectedNext(err)
          } else {
            if (err instanceof MyPromise) {
              err.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(err)
            }
          }
        } catch (error) {
          onRejectedNext(error)
        }
      }

      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        case FULFILLED:
          onFulfilled(_value)
          break
        case REJECTED:
          onRejected(_value)
          break
      }
    })
  }

  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
}
export default MyPromise
