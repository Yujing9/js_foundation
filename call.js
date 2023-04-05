// call 函数的实现
// 第一步
function person() {
    console.log(this.name);
}
var obj = { name: 'zhangsan' };
person.call(obj); // zhangsan

//意思是
var obj = { 
    name: 'zhangsan' ,
    person: function () {
        console.log(this.name);
    }
};
obj.person(); // zhangsan



// 进化
// 手写call函数
function person() {
    console.log(this.name);
}
Function.prototype.myCall = function (context) {
    console.log(this); // [Function: person] // 这里依旧是隐式绑定，所以输出的是person
}
person.myCall(obj); // [Function: person]

// 进化
function person() {
    console.log(this.name);
}
var obj = { name: 'zhangsan' };
Function.prototype.myCall = function (obj) {
    // this指向的是person
    obj.fn = this;
    // 执行obj.fn()，这里的this指向的是obj
    //this关键字：在函数被调用时，this关键字会指向调用该函数的对象。在这个例子中，调用者是obj对象，所以this关键字指向obj对象。
    obj.fn();
    // 删除obj.fn
    delete obj.fn;
}
person.myCall(obj); // zhangsan

// 进化
// call 的第一个参数是this的指向，后面的参数是传递给函数的参数（可以有多个）
function person(a,b,c,d) {
    console.log(this.name);
    console.log(a,b,c,d);
}
var obj = { name: 'zhangsan' };
Function.prototype.myCall = function (obj) {
    // this指向的是person
    obj.fn = this;
    // 保存除this外的参数
    let newArgs = [];
    for (let i = 1; i < arguments.length; i++) {
        newArgs.push(arguments[i]);
    }
    // 执行obj.fn()，这里的this指向的是obj
    //this关键字：在函数被调用时，this关键字会指向调用该函数的对象。在这个例子中，调用者是obj对象，所以this关键字指向obj对象。
    //数组相当于一个参数，所以需要拆开来显示
    obj.fn(...newArgs);
    // 删除obj.fn
    delete obj.fn;
}
person.myCall(obj,a,b,c,d); // zhangsan

// 简化流程
// call
Function.propotype.myCall = function (context, ...args) {
    if(context === undefined && context === null) {
        context = window;
    }
    // 利用Symbol创建一个唯一的属性避免跟其他变量的属性名发生冲突
    let fn = Symbol();
    context.fn = this;
    let res = context.fn(...args);
    delete context.fn;
    return res;
}
// apply ,只是参数不一样,apply的参数是一个数组
Function.propotype.myApply = function (context, args) {
    if(context === undefined && context === null) {
        context = window;
    }
    let fn = Symbol();
    context.fn = this;
    let res = context.fn(...args);
    delete context.fn;
    return res;
}
//bind 和call的区别是bind返回的是一个函数，需要手动调用
Function.propotype.myBind = function (context, ...args) {
    if(context === undefined && context === null) {
        context = window;
    }
    // 创建一个唯一属性
    let f = Symbol();
    // 保存this指针
    let fn = this;
    // 传入的参数args2是bind函数第二个括号的📖
    const result = function (...args2) {
        //判断是否使用new
        if(this instanceof result) {
            //使用的话，this指向的是result的实例
            this.f = fn;
            let res = this.f(...args, ...args2);
            delete this.f;
            return res;
        }else {
            context.f = fn;
            let res = context.f(...args, ...args2);
            delete context.f;
            return res;
        }
    }
    // 使用继承的方法obj.create()，使得result的原型指向fn的原型
    // 这里使用 Object.create 方法创建了一个空对象，这个空对象的原型指向了 fn.prototype。
    // 然后，将 result 函数的原型设置为这个空对象，从而实现了 result 函数继承了 fn 函数的原型。
    result.prototype = Object.create(fn.prototype);
    return result;
}
