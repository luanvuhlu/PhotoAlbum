const futch = (url, opts={}, onProgress) => {
    console.log(url, opts);
    return new Promise((res, rej) => {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', 'url');
        for(var k in opts.header||{}){
            xhr.setRequestHeader(k, opts.headers[k]);
        }
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if(xhr.upload && onProgress){
            xhr.upload.onproress = onProgress;
        }
        xhr.send(opts.body);
    });
}

export default futch;