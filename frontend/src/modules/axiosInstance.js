import axios from 'axios'


const instance = axios.create({
    baseURL: `https://youthful-reward`
})

export default instance