import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://gullible-rifle.railway.internal'
})

export default instance