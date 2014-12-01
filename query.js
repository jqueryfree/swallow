var $ = document.querySelectorAll.bind(document);
var $$ = document.getElementById.bind(document);
Element.prototype.findone = function(str) {
    return this.querySelector(str);
};
 