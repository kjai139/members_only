import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://gullible-rifle-production.up.railway.app'
})

export default instance