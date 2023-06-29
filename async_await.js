// async function asyncFn() {
//     const num1 = await fn(1)
//     console.log(num1) // 2
//     const num2 = await fn(num1)
//     console.log(num2) // 4
//     const num3 = await fn(num2)
//     console.log(num3) // 8
//     return num3
//   }
//   const asyncRes = asyncFn()
//   console.log(asyncRes) // Promise
//   asyncRes.then(res => console.log(res)) // 8

// generator版本
function* genFn(){
    const num1 = yield fn(1)
    console.log(num1)
    const num2 = yield fn(num1)
    console.log(num2)
    const num3 = yield fn(num2)
    console.log(num3)
    return num3
}
function generatorToAsync(fn){
    return function(){
        return new Promise((resolve,reject)=>{
            const g = fn
            const next1 = g.next()
            next1.value.then(res1 =>{
                const next2 = g.next(res1)
                next2.value.then(res2=>{
                    const next3 = g.next(res3)
                    next3.value.then(res3=>{
                        resolve(g.next(res3).value)
                    })
                })
            })
        })
    }
}
const asyncRes1 = generatorToAsync(genFn)
console.log(asyncRes1) // Promise
asyncRes1().then(res => console.log(res)) // 8

// const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

// async function test() {
//   const data = await getData()
//   console.log('data: ', data);
//   const data2 = await getData()
//   console.log('data2: ', data2);
//   return 'success'
// }

// // 这样的一个函数 应该再1秒后打印data 再过一秒打印data2 最后打印success
// test().then(res => console.log(res))

// var test = function asyncToGenerator(){
//     function* test() {
//     const data = yield getData()
//     console.log('data: ', data);
//     const data2 = yield getData()
//     console.log('data2: ', data2);
//     return 'success'
//     }
// }
// 手写async await 函数
//generatorFunc 就是generator 函数来的
function asyncToGenerator(generatorFunc){
    return function(){
        // 防止指针丢失
        const gen = generatorFunc.apply(this, arguments)
        //需要返回一个promise 对象
        return new Promise((resolve,reject)=>{
            function step(key,arg){
                let generatorResult
                try {
                    //由于gen是一个生成器对象，它具有next和throw两个方法，因此在这里，key的值只能是'next'或'throw'。
                    generatorResult = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }
                const {value,done} = generatorResult
                if(done){
                    return resolve(value)
                    // 如果没有完成需要一直递归下去,还没有走到最后，还在yield节点处
                }else{
                    return Promise.resolve(value).then(val =>{step("next",val),err => step("throw",err)})
                }
            }
            // 第一次调用生成器的时候，不需要参数
            step("next")
        })
    }
}
