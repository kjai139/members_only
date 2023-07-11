import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://prized-mint-production.up.railway.app'
})

export default instance