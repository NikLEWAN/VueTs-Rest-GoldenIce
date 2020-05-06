"use strict";
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('email') != "admin@goldenice.com" || urlParams.get('password') != "123") {
    window.location.href = "./login.html";
}
