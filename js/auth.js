"use strict";
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('email') != "admin@goldenice.com" || urlParams.get('password') != "123") {
    window.location.href = "./login.html";
}
var baseUri = "https://goldenice20200505111435.azurewebsites.net/api/IceCreams";
var weatherUri = "https://goldenice20200505111435.azurewebsites.net/api/weathers";
new Vue({
    el: "#app",
    data: {
        icecreams: [],
        weathers: [],
        weathernow: { degress: 16, timenow: "" },
        disc: 0.65,
        weatherDisc: 15,
        errors: [],
        deleteId: 0,
        deleteMessage: "",
        formData: { name: "", description: "", imgUrl: "", price: 0, size: "" },
        addMessage: ""
    },
    mounted: function () {
        this.getAllicecreams();
        this.getWeather();
    },
    methods: {
        getAllicecreams: function () {
            var _this = this;
            axios.get(baseUri)
                .then(function (response) {
                _this.icecreams = response.data;
            })
                .catch(function (error) {
                //this.message = error.message
                alert(error.message); // https://www.w3schools.com/js/js_popup.asp
            });
        },
        getWeather: function () {
            var _this = this;
            axios.get(weatherUri)
                .then(function (response) {
                console.log(response.data.slice(-1)[0]);
                _this.weathernow = response.data.slice(-1)[0];
            })
                .catch(function (error) {
                //this.message = error.message
                alert(error.message);
            });
        },
        loadBase64: function (ev) {
            var _this = this;
            var file = ev.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.formData.imgUrl = e.target.result;
                //console.log(this.formData.imgUrl);
            };
            reader.onerror = function (e) {
                alert(e);
            };
            reader.readAsDataURL(file);
        },
        deleteicecream: function (deleteId) {
            var _this = this;
            var uri = baseUri + "/" + deleteId;
            axios.delete(uri)
                .then(function (response) {
                _this.deleteMessage = response.status + " " + response.statusText;
                _this.getAllicecreams();
            })
                .catch(function (error) {
                //this.deleteMessage = error.message
                alert(error.message);
            });
        },
        addicecream: function () {
            var _this = this;
            axios.post(baseUri, this.formData)
                .then(function (response) {
                var message = "response " + response.status + " " + response.statusText;
                _this.addMessage = message;
                _this.getAllicecreams();
            })
                .catch(function (error) {
                // this.addMessage = error.message
                alert(error.message);
            });
        }
    }
});
