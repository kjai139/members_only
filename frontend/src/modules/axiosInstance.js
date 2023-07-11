import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://prized-mint.railway.internal:4000'
})

export default instance