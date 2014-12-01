/**
 * Emulate FormData for some browsers
 * MIT License
 * (c) 2010 François de Metz
 * https://github.com/francois2metz/html5-formdata
 */
(function(w) {
    if (w.FormData)
        return;
    function FormData() {
        this.fake = true;
        this.boundary = "--------FormData" + Math.random();
        this._fields = [];
    }
    FormData.prototype.append = function(key, value) {
        this._fields.push([key, value]);
    }
    FormData.prototype.toString = function() {
        var boundary = this.boundary;
        var body = "";
        this._fields.forEach(function(field) {
            body += "--" + boundary + "\r\n";
            // file upload
            if (field[1].name) {
                var file = field[1];
                body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ file.name +"\"\r\n";
                body += "Content-Type: "+ file.type +"\r\n\r\n";
                body += file.getAsBinary() + "\r\n";
            } else {
                body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
                body += field[1] + "\r\n";
            }
        });
        body += "--" + boundary +"--";
        return body;
    }
    w.FormData = FormData;
})(window);

function request(type, url, opts, callback) {
    var xhr = new XMLHttpRequest();
    if (typeof opts === 'function') {
        callback = opts;
        opts = null;
    }
    xhr.open(type, url);
    
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects
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


// refs:
// https://github.com/gkoberger/Global-FormData/blob/master/formdata.js
// https://developer.mozilla.org/en-US/docs/Web/API/FormData
