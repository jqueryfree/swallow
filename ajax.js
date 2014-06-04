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
                message: 'server timeout.'
            });
        }
    };
    xhr.send(opts ? fd : null);
}

var get = request.bind(this, 'GET');
var post = request.bind(this, 'POST');
