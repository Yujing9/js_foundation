// settimeout - setinterval,n秒后循环执行
// 使用setimeout 模拟实现setinterval
function mySetInterval(func,time){
    let timer = null
    function inside(){
        func()
        timer = setTimeout(inside,time)
    }
    inside()
    return {
        cancel(){
            clearTimeout(timer)
        }
    }
}


// setinterval - settimeout，n秒后执行
// 使用setimeout 模拟实现setinterval
function mySetTimeout(fn,time){
    let timer = setInterval(()=>{
        clearInterval(timer);
        fn();
    },time)
}

function mySetTimeout(fn, time) {
    let timer = setInterval(() => {
      clearInterval(timer);
      fn();
    }, time);
  }
  
  // 使用
  mySetTimeout(() => {
    console.log(1);
  }, 2000);


function mySetInterval(func,time){
    
}
  