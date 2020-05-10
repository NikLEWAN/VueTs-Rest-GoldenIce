interface Iicecream {
    id: number
    name: string
    description: string
    imgUrl: string
    price: number
    size: string
}

let baseUri: string = "https://goldenice20200505111435.azurewebsites.net/api/IceCreams"

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
    mounted() {
        this.getAllicecreams()
    },
    methods: {
        getAllicecreams() : void {
            axios.get<Iicecream[]>(baseUri)
                .then((response: AxiosResponse<Iicecream[]>) => {
                    this.icecreams = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        loadBase64(ev) : void {
            const file = ev.target.files[0];
            const reader = new FileReader();
      
            reader.onload = (e) => {
                this.formData.imgUrl = e.target.result;
                //console.log(this.formData.imgUrl);
            }
            reader.onerror = (e) => {
                alert(e);
              };
            reader.readAsDataURL(file);
        },
        deleteicecream(deleteId: number) : void {
            let uri: string = baseUri + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = response.status + " " + response.statusText
                    this.getAllicecreams()
                })
                .catch((error: AxiosError) => {
                    //this.deleteMessage = error.message
                    alert(error.message)
                })
        },
        addicecream() : void {
            axios.post<Iicecream>(baseUri, this.formData)
                .then((response: AxiosResponse) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.addMessage = message
                    this.getAllicecreams()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})