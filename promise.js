// 手写promise 函数,最基本的promise函数
//new 一个promise对象，传入一个函数，函数有两个参数，resolve和reject
// 还需要有相应的status状态，分别是pending，fulfilled，rejected
// promise 的状态可以从pending变为fulfilled或者rejected，但是不可逆

let promise = new Promise((resolve,reject) => {
    resolve('success')
    reject('error')
    // 执行异常时
    // throw new Error('error')
})
// then可以传入两个参数，分别是成功和失败的回调,then只会执行成功状态或者拒绝状态的一个 
// 在原生promise的时候，报错的话，可以输出结果出来 
// 原生中，如果传入的是一个函数，那么会执行这个函数。如果传入的不是函数，那么会忽略。 
// then 里面的函数是异步执行的
promise.then((res) => {
    console.log(res)
    console.log(res.message)
    // 链式调用
}).then((res) => {
    console.log(res)
})

// 顺序：基本结构，this指向，then，执行异常，异步，回调保存，链式调用。

class myPromise{
    static PENDING = 'pending'; 
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(func){
        this.status = myPromise.PENDING;
        this.value = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        //以下定义会使this指针丢失，它指向的是window，所以需要bind
        //func(this.resolve,this.reject);
        // this指向
        //func(this.resolve.bind(this),this.reject.bind(this));
        //执行异常，可以使用try catch 
        try{
            func(this.resolve.bind(this),this.reject.bind(this));
        }catch(e){
            this.reject(e);
        }
    }
    // resolve里面可以传入参数
    resolve(value){
        //resolve 是在事件循环的末尾执行的，所以需要使用异步执行
        setTimeout(() => {
            if(this.status === myPromise.PENDING){
                this.status = myPromise.FULFILLED;
                this.value = value; 
                // 查看是否有then那边保留的回调函数，如果有，就执行
                this.resolveCallbacks.forEach(callback => callback(value));
            }
            console.log(value);
        })
    };
    reject(value){
        //reject 是在事件循环的末尾执行的，所以需要使用异步执行
        setTimeout(() => {
            if(this.status === myPromise.PENDING){
            this.status = myPromise.REJECTED;
            this.value = value;
            // 查看是否有then那边保留的回调函数，如果有，就执行
            this.rejectCallbacks .forEach(callback => callback(value));
        }
        console.log(value);
        })
    }
    // then方法
    then(onFulfilled,onRejected){
        // 链式调用，只需要在then里面返回一个新的promise对象即可
        return new myPromise((resolve,reject) => {
            // 原生中，如果传入的是一个函数，那么会执行这个函数。如果传入的不是函数，那么会忽略。 
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {};
            onRejected = typeof onRejected === 'function' ? onRejected : () => {}; 
            // 因为异步的时候，resolve和reject 并没有获得任何值，所以需要让then里面的函数稍后再执行。等resolve 执行后，再执行then，所以需要使用数组来保存函数
            // 回调保存
            if(this.status === myPromise.PENDING){
                this.resolveCallbacks.push(onFulfilled);
                this.rejectCallbacks.push(onRejected);
            }

            if(this.status === myPromise.FULFILLED){
                // 异步执行
                setTimeout(() => {
                    onFulfilled(this.value);})
            }
            if(this.status === myPromise.REJECTED){
                // 异步执行
                setTimeout(() => {
                    onRejected(this.value);})
            } 
        })
    }
}
