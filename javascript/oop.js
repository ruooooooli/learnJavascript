// 构造函数 通常第一个字母大写
var Person = function (name) {
    // 第一种解决不使用 new 的办法
    'use strict';
    console.log('第一种');
    this.name = name || 'name';
};

var Dog = function (name = 'zhang') {
    // 第二种解决不使用 new 的办法

    console.log('shis is : ', arguments, [].slice.call(arguments));

    if (!(this instanceof Dog)) {
        console.log('第二种');
        return new Dog();
    }

    this.name = name;

    // 如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。
    return 199;

    // 如果return语句返回的是一个跟this无关的新对象，new命令会返回这个新对象，而不是this对象
    // return { name : 1000 };
};

// 执行 new 命令 返回一个实例对象
// 执行构造函数 可以带括号 也可以不带括号
// 为了避免不使用 new 关键字的命令直接调用构造函数 在构造函数内部第一行使用 use strict
var zhang   = new Person();
// var tian    = Person(); // 这样不使用 new 就会报错
var dog     = Dog();
console.log(zhang);
console.log(dog);


/**
 * 创建一个空对象，作为将要返回的对象实例
 * 将这个空对象的原型，指向构造函数的prototype属性
 * 将这个空对象赋值给函数内部的this关键字
 * 开始执行构造函数内部的代码
 */


/**
 * 下面代码中，getMessage是一个普通函数，返回一个字符串。
 * 对它使用new命令，会得到一个空对象。这是因为new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象。
 * 本例中，return语句返回的是字符串，所以new命令就忽略了该语句。
*/
function getMessage()
{
    return 'this is function get message';
}

var msg = new getMessage();
console.log(msg);
console.log(typeof msg);

console.log(this);
