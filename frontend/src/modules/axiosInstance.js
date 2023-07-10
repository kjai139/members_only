import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://gullible-rifle.railway.internal'
})

export default instance