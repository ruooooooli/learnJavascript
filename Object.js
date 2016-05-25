/*
* @Author               : ruoli
* @Email                : ruooooooli@gmail.com
* @Date                 : 2016-05-25 14:38:25
* @Last Modified by     : ruooooooli
* @Last Modified time   : 2016-05-25 16:00:41
*/
'use strict';

/******************************************************************************/
// 创建一个新的对象
var o   = new Object(); //1
var o1  = { a : 1}      //2
// 有参数 对象直接返回对象
var o2  = new Object(o1);
console.log(o1 === o2);

// 利用这个特性 可以写一个判断变量是否是对象的函数
function isObject(value) {
    return value === Object(value);
}

//原始类型返回包装的对象
console.log(new Object(123) instanceof Number);

/******************************************************************************/
// 在 Object 上面部署一个新的方法 显示其他对象的内容
Object.printf = function (o)
{
    console.log(o);
}
var o3 = new Object();
Object.printf(o3);
//2 部署在 prototype 上面的方法将被所有的实例共享
// 这里实例化的对象是直接继承了 Object.prototype 的属性和方法,可以在自身调用
Object.prototype.printf = function ()
{
    console.log(this);
}
var o4 = new Object();
o.printf();
/******************************************************************************/
// Object 对象的方法

// 返回空的对象
Object();
Object(undefined);
Object(null);

Object(1);      // new Number(1);
Object('foo');  // new String('foo');
Object(true);   // new Boolean(true);

Object([]);     // 返回原数组
Object({});     // 返回原对象
Object(function () {}); // 返回原函数
/******************************************************************************/
// Object.keys() 返回数组 对象自身的属性名(不是继承的) 只返回可枚举的属性
// Object.getOwnPropertyNames() 还可返回不可枚举的属性名
var o5 = Object();
o5.a = 123;
o5.b = 234;

// 一般对象来说是一样的
console.log(Object.keys(o5));
console.log(Object.getOwnPropertyNames(o5));
// 当遇到不可枚举的属性 才不一样
var o6 = ['hello', 'world'];
console.log(Object.keys(o6));
console.log(Object.getOwnPropertyNames(o6)); // 这里数组的 length 是不可枚举的
// javascript 里面没有计算对象属性个数的方法,可以用这个属性代替
console.log(Object.keys(o6).length);
console.log(Object.getOwnPropertyNames(o6).length);
/******************************************************************************/
// Object.observe() 用于观察对象属性的变化
var o7 = new Object();
Object.observe(o7, function (changes) {
    changes.forEach(function (change) {
        console.log(change.type, change.name, change.oldValue);
    });
});
o7.foo = 1;
o7.foo = 2;
delete o7.foo;
/******************************************************************************/
// 其他方法
// Object.getOwnPropertyDescriptor();
/******************************************************************************/
// 还有很多部署在 Object.prototype 上面的 所有的 Object 都继承了
// Object.valueOf() 返回当前对象对应的值
var o8 = new Object();
console.log(o8.valueOf() === o8); //默认情况下返回对象的本身
console.log(1 + o8);
// 当定义了 valueOf 方法的时候 得到正确的结果
o8.valueOf = function () {
    return 3;
}
console.log(1 + o8);

// Object.toString() 返回当前对象对应的字符串形式
var o9 = new Object();
console.log(o9.toString());     // "[object Object]"
var o10 = { a : 1 };
console.log(o10.toString());    // "[object Object]"
o9.toString = function () {
    return 'hello';
}
console.log(o9.toString());

// 字符串 数组 函数 Date对象分别定义了自己的toString()方法
console.log([1,2,3].toString());
console.log('111'.toString());
console.log((function () {
    return 123;
}).toString());
console.log((new Date()).toString());

// Object.prototype.toString 可以得到一个实例对象的构造函数
// 利用这个特性可以写一个比 typeof 更加准确的类型判断函数
var type = function (o) {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

// 通过函数的 call 方法可以在任意值上调用 Object.prototype.toString 方法
console.log(Object.prototype.toString.call(1));
console.log(Object.prototype.toString.call({}));
console.log(type({}));
console.log(type([]));

// Object.toLocaleString();    // 返回当前对象对应的本地字符串形式
// Object.hasOwnProperty();    // 判断某个属性是否是当前对象自身的属性,还是继承自原型的属性
// Object.isPrototypeOf();     // 判断当前对象是否是另一个对象的原型
// Object.propertyIsEnumerable(); // 判断某个属性是否可枚举
/******************************************************************************/
// 在JavaScript内部，每个属性都有一个对应的attributes对象，保存该属性的一些元信息
// 使用Object.getOwnPropertyDescriptor方法，可以读取attributes对象
var o12 = { p : 1 }
console.log(Object.getOwnPropertyDescriptor(o12, 'p'));

//
var o13 = Object.defineProperty({}, 'p', {
    value           : 123,
    writable        : false,    // 只读
    enumerable      : false,    // 表示对应的属性不会出现在for...in循环和Object.keys方法中
    configurable    : false     // 导致无法删除某个属性
});
console.log(o13.p);

// 至于for...in循环和Object.keys方法的区别，在于前者包括对象继承自原型对象的属性，而后者只包括对象本身的属性
// enumerable 可以设置秘密属性
var o14 = { a : 1, b : 2};
o14.c = 3;
Object.defineProperty(o14, 'd', {
    value       : 4,
    enumerable  : false
});
console.log(o14.d);
// 无法读取秘密属性
for (var key in o14) {
    console.log(o14[key]);
}
/******************************************************************************/
var o15 = Object.defineProperties({}, {
        p1: { value: 1, enumerable: true },
        p2: { value: 2, enumerable: false }
});

Object.getOwnPropertyNames(o15);
// 系统原生的属性（即非用户自定义的属性）都是不可枚举的

// 判断一个属性是否可以枚举
var o16 = new Object();
o16.p = 222;
console.log(o16.propertyIsEnumerable('p'));         // true
console.log(o16.propertyIsEnumerable("toString"));  // false
/******************************************************************************/
// 可配置性（configurable）决定了是否可以修改属性的描述对象
// 也就是说，当configurable为false的时候，value、writable、enumerable和configurable都不能被修改了
/******************************************************************************/

/******************************************************************************/

/******************************************************************************/

/******************************************************************************/

/******************************************************************************/

/******************************************************************************/

/******************************************************************************/

