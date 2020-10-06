# Class 类

Typescript中的类其实和ES6中的类很类似，只不过Typescript中的class又更多特性

## 类的定义和继承

### 定义

```js
class Person {
    name = 'jack'
    getName() {
      return this.name
    }
}

const person = new Person()
person.getName() // jack
```
这就是最基础的类和ES6的语法基本保持一致

### 继承

我们再看看看继承

```js
class Person {
    name = 'jack'
    getName() {
        return this.name
    }
}

class Teacher extends Person {
    getTeachName () {
        return 'Teacher'
    }
}

const teacher = new Teacher()
console.log(teacher.getName()) // 'jack'
```

Teacher继承Person类后具备Person所有的属性和方法，我们也可以对Person的方法进行覆盖重写

```js
class Person {
    name = 'jack'
    getName() {
        return this.name
    }
}

class Teacher extends Person {
    getTeachName () {
        return 'Teacher'
    }
    getName () {
        return this.getTeachName()
    }
}

const teacher = new Teacher()
console.log(teacher.getName()) //=> 'Teacher'
```

当想在子类当中调用父类的方法的时候，可以使用super关键字，此时的super你可以理解为就是父类

```js
class Person {
    name = 'jack'
    getName() {
        return this.name
    }
}

class Teacher extends Person {
    getTeachName () {
        return 'Teacher'
    }
    getName () {
        return super.getName() + '-' + this.getTeachName()
    }
}

const teacher = new Teacher()
console.log(teacher.getName()) //=> 'jack-Teacher'
```

## 访问类型

class 有 public、private、protected 三种的访问类型

1. public 允许类内和类外访问
2. private 只允许类内访问
3. protected 只允许类内和继承的子类使用

```js
class Person {
    name: string = 'jack'
}

const person = new Person()
```

定义一个class的时候，属性不写访问类型的会都默认为public，也可以把public写上

```js
class Person {
   public name: string = 'jack'
}

const person = new Person()
```

当设置访问类型为public的时候，属性或方法允许类的内外使用，我们给Person新增sayHi方法

```js
class Person {
   public name: string = 'jack'
   public sayHi () {
       console.log(this.name)
   }
}

const person = new Person()
person.sayHi()
```

sayHi的函数属于类内的，在class作用域内的即为类内，而不在其作用域内的即为类外，而sayHi方法就是使用了类内的变量，上面说到public可以使用类外的变量或者函数，举个例子，我们可以在实例化得person把name修改为'tom'


```js
class Person {
   public name: string = 'jack'
   public sayHi () {
       console.log(this.name)
   }
}

const person = new Person()
person.name = 'tom'
person.sayHi() // tom
```

假设把name的访问类型修改为private

```js
class Person {
   private name: string = 'jack'
   public sayHi () {
       console.log(this.name)
   }
}

const person = new Person()
person.name = 'tom' // error
person.sayHi()
```

这个时候我们就会发现 person.name = 'tom' 这一句会报错，那是因为private的访问类型，属性或方法允许类的内使用。然后我们再把private修改为protected， person.name = 'tom' 这里依旧会报错，protected的访问类型的，属性或者方法只允许在类内或者继承的子类中使用

```js
class Person {
   protected name: string = 'jack'
   public sayHi () {
       console.log(this.name)
   }
}

class Teacher extends Person {
    public sayBye () {
        console.log(this.name)
    }
}

const teacher = new Teacher()
teacher.sayBye() // jack
```

## static

当把属性或者方法直接挂在在class上面的时候，我们可以使用static关键字

```js
class Person {
    static getName () {
        return '123'
    }
}

Person.getName()
```

## readonly

之前interface的时候提及到`readonly`关键字，在class当中也可以使用，表示当前变量只可读

```js
class Person {
    public readonly name: string
    constructor(name: string) {
        this.name = name
    }
}

const person = new Person('jack')
person.name = 'jack' // 错误
```

## constructor

假设希望在在类实例化的时候传入一个参数入内，这个时候我们可以使用constructor

```js
class Person {
    public name: string;
    constructor (name: string) {
        this.name = name
    }
}

const person = new Person('jack')
```
在TS当中我们也可以使用简化写法

```js
class Person {
    public name: string;
    constructor(public name: string) {}
}
```

我们继续新建一个Teacher的类，继承Person的类

```js
class Person {
    public name: string;
    constructor(public name: string) {}
}

class Teacher extends Person {
    constructor(public age: number) {
    }
}

const teacher = new Teacher(28)
```

这个时候我们会发现Teacher的constructor会报错，那是因为继承了Person类，父类需要被实例化，我们这个使用应当使用super关键字进行实例化

```js
class Person {
    public name: string;
    constructor(public name: string) {}
}

class Teacher extends Person {
    constructor(public age: number) {
        super('jack')
    }
}

const teacher = new Teacher(28)
```

之前说过super可以理解为指代了父类，这里super可以理解为父类的constructor，Typescript当中必须给属性值设置初始值，或者使用`constructor`进行初始化

## 静态属性 Setter 和 Getter

上面讲到假如设置访问类型为private的时候，只允许在类内使用，当我们希望对外暴露一个经过处理或者加密后的private的值的时候，我们可以使用getter

```js
class Person {
    constructor (private _name: string) {}
    get name () {
        return `${this._name}_jack`
    }
}

const person = new Person('jack')
console.log(person.name) // 'jack_jack'
```

相反的，希望设置一个值，但是这个值，会经过处理后在修改类内的私有属性的时候，我们可以使用setter

```js
class Person {
  constructor (private _name: string) {}
  get name () {
      return `${this._name}_jack`
  }
  set name (name: string) {
      this._name = name
  }
}

const person = new Person('jack')
person.name = 'tom'
console.log(person.name) // tom_jack
```

## 抽象类

假设有多个类，而这些类具备很多共性，这个时候我们可把这个定义为抽象类，使用`abstract` 去定义，我们来定一个形状的Class

```js
abstract class Shape {
    width: number = 100;
    abstract getType (): string 
}
```

Class内的函数或变量可以使用抽象话，表示这个当前这个函数或者变量也是抽象的，当我们去实例化抽象类的时候会发现会发生报错，那是因为抽象类不能被实例化只能被继承

```js
class Circular extends Shape {
    getType () {
        return 'circular'
    }
}
```

## 类与接口

假设有多个类，而这些类具备相同的接口，这个时候我们可以使用接口来抽象，而这个和抽象类的一个区别，抽象类可以可能会具备一样的属性，而使用接口来抽象，只是抽象了这个动作，具体的抽象过程需要各个类去实现

```typescript

interface Eat {
  eat(food: string): void
}

interface Run {
  run(distance: number): void
}

class Person implements Eat, Run {
  eat (food: string): void {
    console.log(`优雅的进餐: ${food}`)
  }
  run (distance: number): void {
    console.log(`直立行走: ${distance}`)
  }
}

class Animal implements Eat, Run {
  eat (food: string): void {
    console.log(`呼噜呼噜的吃: ${food}`)
  }

  run (distance: number) {
    console.log(`爬行: ${distance}`)
  }
}
```

## 附 总结使用-单例模式

单例模式是我们经常使用的一种方式，下面我们来基于Typescript去实现一个单例模式
，首页实例模式顾明思议就是我们在new 一个Class的时候，我们希望他只能实例化一个Class，在Typescript里首先我们应该就是先限制住实例化

```js
class Demo {
   private construtor () {}
}
```

我们在construtor中新增一个private 类型声明，但是我们增加了private后，整个Class就无法再类外完成实例化了，所以我们需要在类内增加一个实例化的方法

```js
class Demo {
    private construtor () {}
    static getInstance () {
        return new Demo()
    }
}
```

代码写到这里，就会发现我们虽然使用static暴露出一个getInstance，但是里面代码确实每次都实例化了一下本身，单例模式我们希望的是每次都是同一个实例，所以这个时候我们应该把实例存起来用于返回

```js
class Demo {
    private static instance: Demo;
    private construtor () {}
    static getInstance () {
        if (!this.instance) {
            this.instance = new Demo(name)
        }
        return this.instance
    }
}
```
这样子我们就使用Typescript完成了一个最基础的单例模式了