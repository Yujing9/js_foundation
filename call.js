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


// // 看了新的视频又加深了理解

// const person = {
//     name: 'John',
//     sayHello: function() {
//       console.log(`Hello, my name is ${this.name}`);
//     }
//   };
  
//   const jane = {
//     name: 'Jane'
//   };
  
//   person.sayHello.call(jane,1,2,3); // 输出：Hello, my name is Jane
//   person.sayHello.myCall(jane,1,2,3); // 输出：Hello, my name is Jane
  
  
// // 1.如何将我自定义的方法可以被直接调用呢，需要将它写入方法的属性中（加入原型链）,才可以被function直接被调用
// Function.prototype.myCall = function(context,...arg){
//     // 2. 需要判断一下this到底是不是的函数,不是函数，需要抛出错误
//     if(typeof this !== 'function'){
//         throw new Error('error')
//     }
//     // 3.看看context指向,如果context没有传入任何值，那么指向的是window
//     if(context === undefined||context === null){
//         context =  window
//     }
//     //4.此时this代表的是什么。是person.sayHello。它是一个函数
//     let keep = this
//     // 5.我们想改变一下this指针。需要创建在jane里面创建一个函数，并将person里面的函数放进这个假设的函数内，后面才可以被调用
//     context.fn = keep
//     // 6.我们需要获取后面的参数
//     let res = context.fn(...arg)
//     //有创建就得有删除，不然会混乱
//     delete context.fn
//     return res
// }

// const person = {
//     name: 'John',
//     sayHello: function() {
//       console.log(`Hello, my name is ${this.name}`);
//     }
//   };
  
//   const jane = {
//     name: 'Jane'
//   };
  
//   person.sayHello.apply(jane,[1,2,3]); // 输出：Hello, my name is Jane
//   person.sayHello.myApply(jane,[1,2,3]); // 输出：Hello, my name is Jane

//   // 1.将myApply放入function的原型链中，不然不可以被调用
//   Function.prototype.myApply = function(context,arg){
//     // 2.判断一下传入的context有无值
//     if(context === undefined || context === null){
//         context = window
//     }
//     // 3.判断一下person。sayhello是不是个函数
//     if(typeof this !== 'function'){
//         throw new Error('error')
//     }
//     //4.我们想要改变this的指向。想要将person中的this指向，指向jane
//     // 5.需要在上下文中创建一个假的fn，并将this（相当一个方法，放进入fn中）
//     context.fn = this
//     // 7.调用一下方法，将值传入
//     let res = context.fn(...arg)
//     // 6.假设后还需要删掉这个方法
//     delete context.fn
//     return res
//   }

//   const person = {
//     firstName: "John",
//     lastName: "Doe",
//     fullName: function() {
//       return this.firstName + " " + this.lastName;
//     }
//   }
  
//   const logName = function() {
//     console.log(this.fullName());
//   }
  
//   const logPersonName = logName.bind(person);
//   情况1.logPersonName();
//   情况2.const obj = new logPersonName();

//   const logPersonName = logName.myBind(person);
//   logPersonName();

// //1.myBind放入function的原型链中，不然不可以被调用
// Function.prototype.myBind = function(context,...arg1){
//         // 3.判断context是否为空
//         if(context === undefined || context === null){
//             context = window
//         }
//         // 4.判断this是否为函数
//         if(typeof this !== 'function'){
//             throw new Error('error')
//         }
//         let keep = this 
//         const result = function(...arg2){
//             if(this instanceof result){
//                 this.fn = keep
//                 let res = this.fn(...arg1,...arg2)
//                 delete this.fn
//                 return res
//             }else{
//                 //5.创建一个假的context.fn，将this这个函数保存进入
//                 context.fn = keep
//                 let res = context.fn(...arg1,...arg2)
//                 delete context.fn
//                 return res
//             }
            
//         }

//         // 需要返回参数
//         // 要继承原型，不然不知道返回的函数都在调用什么。这个表达式常常用于实现继承。fn是爸爸，result是儿子
//         result.prototype = Object.create(fn.prototype);
//         return result
//     }
    
