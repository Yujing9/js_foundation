function quchong(arr){
    arr.filter((item,index,self)=>{
        return self.indexOf(item) === index
    })
}