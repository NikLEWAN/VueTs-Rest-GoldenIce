interface Iicecream {
    id: number
    name: string
    description: string
    imgUrl: string
    price: number
    size: string
}
interface Iweather {
    id: number
    degress: number
    timenow: string
}

const baseUri: string = "https://goldenice20200505111435.azurewebsites.net/api/IceCreams"
const weatherUri: string = "https://goldenice20200505111435.azurewebsites.net/api/weathers"
const weekUri: string = "https://samples.openweathermap.org/data/2.5/weather?q=copenhagen,uk&appid=439d4b804bc8187953eb36d2a8c26a02"

new Vue({
    el: "#app",
    data: {
        icecreams: [],
        weathers: [],
        weathernow: {degress: 16, timenow: ""},
        disc: 0.65,
        weatherDisc: 15,
        errors: [],
        formData: { name: "", description: "", imgUrl: "", price: 0, size: "" }
    },
    mounted() {
        this.getAllicecreams()
        this.getWeather()
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
        getWeather() : void {
            axios.get<Iweather[]>(weatherUri)
                .then((response: AxiosResponse<Iweather[]>) => {
                    console.log(response.data.slice(-1)[0])
                    this.weathernow = response.data.slice(-1)[0] 
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message)
                })
        }
    }
})