"use strict";
var baseUri = "https://goldenice20200505111435.azurewebsites.net/api/IceCreams";
var weatherUri = "https://goldenice20200505111435.azurewebsites.net/api/weathers";
var weekUri = "https://samples.openweathermap.org/data/2.5/weather?q=copenhagen,uk&appid=439d4b804bc8187953eb36d2a8c26a02";
new Vue({
    el: "#app",
    data: {
        icecreams: [],
        weathers: [],
        weathernow: { degress: 16, timenow: "" },
        disc: 0.65,
        weatherDisc: 15,
        errors: [],
        formData: { name: "", description: "", imgUrl: "", price: 0, size: "" }
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
        }
    }
});
