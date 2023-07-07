function newObj(Func,...arg){
    let obj = {}
    obj.__proto__ = Func.prototype
    let result = Func.call(obj,arg)
    return result instanceof Object ? Object:result
}