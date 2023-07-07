// 实现一个函数柯里化
function add(){
    // 将arguments 对象转化为数组，这是为了实现多个参数的传入
    let args = Array.prototype.slice.call(arguments)
    let inner = function(){
        args.push(...arguments)
        // 然后需要实现参数之间的累加,但是没有办法传入任意延迟输入参数。所以使用递归，调用自己
        // let sum = args.reduce(function(pre,cur){
        //     return pre+cur
        // })
        // return sum 
        // 采用递归，自己调用自己
        return inner
    }
    // 因为返回的inner 会发生隐式转化，所以修改隐式转换的内容，将它用累加的形式
    inner.toString =function(){
        return args.reduce(function(pre,cur){
                return pre+cur
        })
    }
    return inner
}
//调用函数，所以说，我们需要返回一个函数
add(1)(2)(3)
