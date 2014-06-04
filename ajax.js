function request(type, url, opts, callback) {
    var xhr = new XMLHttpRequest();
    if (typeof opts === 'function') {
        callback = opts;
        opts = null;
    }
    xhr.open(type, url);
    var fd = new FormData();
    if (type === 'POST' && opts) {
        for (var key in opts) {
            fd.append(key, opts[key]);
        }
    }
    xhr.onload = function () {
        //console.log(xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.response));
        } else {
            callback({
                success: false,
                message: '\u670D\u52A1\u5668\u8BF7\u6C42\u8D85\u65F6\uFF01'
            });
        }
    };
    xhr.send(opts ? fd : null);
}
