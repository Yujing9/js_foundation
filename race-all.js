// 手写race，all,retry
class Promise{
    static race(promises){
        return new Promise((resolve,reject)=>{
            for(let promise in promises){
                Promise.resolve(promise)
                .then(res=>resolve(res))
                .catch(err=>reject(err)) 
            }
        })
    }
    // 需要按顺序返回所有的promise的结果
    static all(promises){
        return new Promise((resolve,reject)=>{
            let result = []
            let index = 0
            for(let i = 0;i<promises.length;i++){
                Promise.resolve(promises[i])
                .then(res=>{
                    // 将当前返回结果按照顺序放到数组中
                    result[i] = res
                    // 判断是否所有的promise都已经返回结果
                    index++;
                    if (index === promises.length) {
                        // 所有的promise都已经返回结果
                        resolve(result);
                    }
                })
                .catch(err=>reject(err))
            }
        })
    }
}
function retry(fn,delay,times){
    return new Promise((resolve,reject)=>{
        // 递归调用
        function attempt(){
            Promise.resolve(fn())
            .then(res=>resolve(res))
            .catch(err=>{
                if(times === 0){
                    reject(err)
                }else{
                    times--
                    setTimeout(()=>{
                        attempt()
                    },delay)
                }
            })
        }
        attempt()
    })
}