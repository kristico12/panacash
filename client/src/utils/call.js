function header(url, type, data) {
    let options = {
        method: type,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    };
    if (data !== null){
        options['body'] = JSON.stringify(data);
    }
    return new Request(url, options)
}

function Call(url, type='GET', data=null) {
    return new Promise((resolve, reject) => {
        fetch(header(url, type, data))
            .then(success => resolve(success.json()))
            .catch(error => reject(error))
    })
}

export {
    Call
}