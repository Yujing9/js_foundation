// 目的：在一定时间内，点击多次，也只执行一次
function myThortting(delay,callback){
    // 3. 此时 timeout 为undefined，如何将值存入内存，使用闭包
    let timeOut 
    // 4.使用闭包
    return function(){
        // 2. 将值存储进来，如果有值，说明正在执行中
        if(!timeOut){
            // 1.一段时间，只执行一次
            timeOut = setTimeout(function(){
                callback()
                // 5.只能执行一次，我们想完成后，还能执行这个。需要初始化
                timeOut = null
            },delay)
        }
    }
}
function handle(){
    console.log(Math.random())
}
document.getElementById('button').onclick = myThortting(2000, handle);



