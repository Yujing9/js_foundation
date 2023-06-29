function deepClone(target,hash=new WeekMap()){
    // 如果是基本类型，直接返回
    if(!isObject(target)) return target;
    // 如果是循环引用的对象，直接返回
    if(hash.get(target)) return hash.get(target);
    // 如果是数组，创建一个新的数组，如果是对象，创建一个新的对象
    let newObject = Array.isArray(target) ? {} :[]
    // 避免重复拷贝，解决循环引用问题。
    hash.set(target,newObject)
    for(let key in target){
        //这个判断的作用在于，避免深拷贝过程中复制原对象原型链上的属性，只拷贝原对象自身的属性。
        if (target.hasOwnProperty(key)) {
        // 如果是对象，递归调用deepClone，如果不是，直接赋值
        if(isObject(target[key])){
            newObject[key] = deepClone(newObject[key],hash)
        }else{
            newObject[key] = target[key]
        }
    }
    return newObject
}

}
function isObject(target){
    return typeof target === "object" && target !== null
}
// 浅拷贝
function shallowClone(source){
    // 创建一个新的对象
    let obj = {}
    for(let i in source){
        if(source.hasOwnProperty(i)){
            obj[i] = source[i]
        }
    }
    return obj
}
let person = {
    name : "yuan",
    hobbies :["dance","sing"]
}
let shallowPerson = shallowClone(person)

shallowPerson.name = "yu" 
//基本数据类型浅拷贝，拷贝的是值
console.log(person.name) //yuan
console.log(shallowPerson.name) // yu

// 复杂数据类型深拷贝，拷贝的是内存地址
shallowPerson.hobbies[0] = "swim"
console.log(person.hobbies[0]) //swim
console.log(shallowPerson.hobbies[0]) // swim

function deepClone(source){
    // 3.有递归就有终止条件,如果不是对象的话，不需要继续往里头拷贝了
    if(typeof source!== "object") return source
    if(source instanceof Date) return new Date()
    if(source instanceof RegExp) return new RegExp(source)
    if(source === null) return source
    // 1. 拷贝需要创建一个新的对象
    let obj = Array.isArray(source) ? [] : {}
    for(let i in source){
        if(source.hasOwnProperty(i)){
            // 2.此时需要拷贝每一个值，一点一点的拷贝，所以需要使用递归
            obj[i] = deepClone(source[i])
        }
    }
    return obj
}







