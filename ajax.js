function ajaxPromise(){
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
        xhr.onreadystatechange = function(){
            // readystate 4 means request finished and response is ready(表示收到所有的相应)
            if(xhr.readyState === 4){
                // status 200 means "OK"
                if(xhr.status === 200){
                    resolve(xhr.responseText);
                }else{
                    reject('Error');
                }
            }
        }
        xhr.send();
    });
    return promise;
}

  