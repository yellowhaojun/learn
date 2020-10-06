// 类型断言

const nums: number[] = [110, 120, 119, 1123]

const res = nums.find(i => i > 0) 
const res1 = res as number
const res2 = <number>res