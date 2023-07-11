import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://prized-mint.railway.internal'
})

export default instance