(function (window, document, undefined) {
    var utils = window.utils = window.utils || {};

    var emptyArray = [],
        slice = emptyArray.slice,
        class2type = {},
        toString = class2type.toString;

    utils.type = function (obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call(obj) ] || "object" :
            typeof obj;
    };

    utils.isFunction = function (value) {
        return utils.type(value) == "function";
    };

    utils.isWindow = function (obj) {
        return obj != null && obj == obj.window;
    };

    utils.isDocument = function (obj) {
        return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
    };

    utils.isObject = function (obj) {
        return utils.type(obj) == "object";
    };

    utils.isPlainObject = function (obj) {
        return utils.isObject(obj) && !utils.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    };

    utils.isArray = Array.isArray || function (object) {
        return object instanceof Array;
    };

    var extend = function (target, source, deep) {
        for (var k in source) {
            if (deep && (utils.isPlainObject(source[k]) || utils.isArray(source[k]))) {
                if (utils.isPlainObject(source[k]) && !utils.isPlainObject(target[k])) {
                    target[k] = {};
                }
                if (utils.isArray(source[k]) && !utils.isArray(target[k])) {
                    target[k] = [];
                }
                extend(target[k], source[k], deep);
            } else if (source[k] !== undefined) {
                target[k] = source[k];
            }
        }
    };

    utils.extend = function(target){
        var deep, args = slice.call(arguments, 1);
        if (typeof target == 'boolean') {
            deep = target;
            target = args.shift();
        }
        args.forEach(function(arg){ extend(target, arg, deep) });
        return target;
    };


    utils.vendor = (function () {
        var _elementStyle = document.createElement('div').style;
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
            transform = vendors[i] + 'ransform';
            if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
        }

        return false;
    })();
    utils.prefixStyle = function (style) {
        if (utils.vendor === false) return false;
        if (utils.vendor === '') return style;
        return utils.vendor + style.charAt(0).toUpperCase() + style.substr(1);
    };
})(window, document);
