import axios from 'axios'


const instance = axios.create({
    baseURL: 'gullible-rifle.railway.internal'
})

export default instance