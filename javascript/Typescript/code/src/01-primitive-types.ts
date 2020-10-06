// 原始数据类型
const a: string = 'a'
const b: number = 100 // NaN Infinity 100
const c: boolean = true // false

const e: void = undefined
const f: null = null
const g: undefined = undefined
const h: symbol = Symbol('h')

// 在非严格模式（strictNullChecks）下，
// string, number, boolean 都可以为空
// const d: string = null
// const d: number = null
// const d: boolean = null

export {}