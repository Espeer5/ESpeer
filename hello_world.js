var string = ">>> Hello, World!";
var str = string.split("");
var el = document.getElementById('str');
function animate() {
str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
var running = setTimeout(animate, 90);
};
var string2 = ">>> Welcome to my webpage."
var str2 = string2.split("");
var el2 = document.getElementById('str2');
function animate2() {
    str2.length > 0 ? el2.innerHTML += str2.shift() : clearTimeout(running2);
    var running2 = setTimeout(animate2, 90);
};
el3 = document.getElementById('home_main');
function unfade(element) {
    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.06;
    }, 10);
}
setTimeout(function () {
    (animate2)();
}, 2000);
setTimeout(function () {
    (unfade)(el3);
}, 4000);
(animate)();