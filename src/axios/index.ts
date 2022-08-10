import axios from 'axios'



export default axios.create({
    baseURL: "http://docker.digital-spectr.ru:8888/api/"
})