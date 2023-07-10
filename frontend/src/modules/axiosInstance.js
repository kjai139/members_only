import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://gullible-rifle-production.up.railway.app'
})

export default instance