"use strict";
new Vue({
    el: '#app',
    data: {
        errors: [],
        password: null,
        email: null
    },
    methods: {
        checkForm: function (e) {
            this.errors = [];
            if (!this.password)
                this.errors.push("Name required.");
            if (this.email != "admin@goldenice.com" || this.password != "123")
                this.errors.push("Invalid User Login.");
            if (!this.email) {
                this.errors.push("Email required.");
            }
            else if (!this.validEmail(this.email)) {
                this.errors.push("Valid email required.");
            }
            if (!this.errors.length && this.email == "admin@goldenice.com" && this.password == "123") {
                window.location.href = "./index.html?email=admin@goldenice.com&password=123";
            }
            e.preventDefault();
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
});
