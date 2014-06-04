Element.prototype.on = Element.prototype.addEventListener;
NodeList.prototype.on = function (event, fn) {
    // Array.prototype.forEach.call same
    []['forEach'].call(this, function (el) {
        el.on(event, fn);
    });
    return this;
};
