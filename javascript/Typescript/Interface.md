# Interface 接口

接口是一系列方法的声名，是一些方法特征的集合，在Typescript当中Interface除了可以用于表示方法的声明外，还可是用于限制对象的限制

## 用于限制对象的类型

## 基础使用

基础使用

```typescript
interface Obj {
  name: string
  age: number
}

const obj: Obj = {
  name: 'jack',
  age: 19
}
```

## 可选属性

假如希望某个值，不一定具备，可以使用`?`来表示是可选属性

```typescript
interface Obj {
  name: string
  age?: number
}

const obj: Obj = {
  name: 'jack'
}
```

## 只读属性

假如希望某个值只读，可以使用`readonly`定义只读属性

```typescript

interface Obj {
  readonly name: string
  age: number
}

const obj: Obj = {
  name: 'jack',
  age: 19
}

obj.name = 'tom' // error
```

## 索引类型

不确定key值的情况，可以使用`[]`来定义一个索引类型

```typescript
interface Cache {
  [prop: string]: string
}

const cache: Cache = {}

cache.value = 'value1'
```

## 函数类型

`interface`可以用于表示定义一个函数的接口

```typescript
interface Add{
  (n1: number, n2: number): number // 表示一个函数接收两个参数，n1为number，n2位number，返回一个number类型
}

const add: Add = (n1, n2) => n1 + n2

add(1, 2) // 2
```

## 继承

`interface`可以通过`extends`继承来形成一个新的接口

```typescript
interface Attr1 {
  age: number
}

interface Person extends Attr1 {
  gender: string
}

const person1: Person = {
  age: 18,
  gender: 'man'
}
```

假设需要继承多个接口使用`,`分割

```typescript
interface Attr1 {
  age: number
}

interface Attr2 {
  name: string
}

interface Person extends Attr1, Attr2 {
  gender: string
}

const person1: Person = {
  name: 'jack',
  age: 18,
  gender: 'man'
}
```

