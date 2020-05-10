"use strict";
var baseUri = "https://goldenice20200505111435.azurewebsites.net/api/IceCreams";
new Vue({
    el: "#app",
    data: {
        icecreams: [],
        errors: [],
        deleteId: 0,
        deleteMessage: "",
        formData: { name: "", description: "", imgUrl: "", price: 0, size: "" },
        addMessage: ""
    },
    mounted: function () {
        this.getAllicecreams();
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
        loadBase64(ev) {
            const file = ev.target.files[0];
            const reader = new FileReader();
      
            reader.onload = (e) => {
                this.formData.imgUrl = e.target.result;
                console.log(this.formData.imgUrl);
            }
            reader.onerror = function(error) {
                alert(error);
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
