// 要求：需要在一定时间后获取到值，不能实时响应。当用户停止触发事件的时候，才将值返回
function myDebounce(delay,callback){
    // 2.用户停止触发事件时，才返回值.此时clear的是undefined。如何将timer保存在内存中？使用闭包
    let timer 
    // 4.使用闭包。将timer保存在内存中。每次调用myDebounce函数，都会返回一个新的函数。这个函数中的timer都是独立的
    return function(value){
        // 3.每次触发事件时，都清除上一次的timer
        clearTimeout(timer)
        //1.一定时间获取值
        timer = setTimeout(function(){
            // 5.想在外部输出value，需要将value作为参数传入
            callback(value)
        },delay)
    }
}
function fn(value){
    console.log(value)
}
var debounce = myDebounce(1000,fn)
input.addEventListener('keyup',function(e){
    debounce(e.target.value)
})

function Animals(name){
    this.name = [name]
}
Animals.prototype.getName = function(){
    return this.name
}
function Dog(){
    Animals.call(this,"柴犬")
}

const dog1 = new Dog()
const dog2 = new Dog()
dog1.name[0] = 'bear'
console.log(dog1.name)
console.log(dog2.name)
dog1.getName()