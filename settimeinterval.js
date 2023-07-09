function newInterval(func,time){
    // 需要实现重复调用的功能，所以使用递归
    // function inner(){
    //     setTimeout(func,time)
    // }
    // inner()
    // 1.上面这么写就只会调用一次
    // function inner(){
    //     setTimeout(inner,time)
    // }
    // 2.但是不会调用传进来的参数
    // function inner(){
    //     func()
    //     setTimeout(inner,time)
    // }
    // inner()
    // 3.可以调用参数，但是好像还是有点问题。犯了底层的错误，任务队列的问题。此时func（）不会作为回调函数放入任务队列中。
    function inner(){
        func()
        setTimeout(inner,time)
    }
    setTimeout(inner,time)
    // 此时也不会time 叠加
}
newInterval(like,1000)
function like(){
    console.log("like")
}
