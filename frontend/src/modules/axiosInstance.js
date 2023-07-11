import axios from 'axios'


const instance = axios.create({
    baseURL: `https://prized-mint.railway.internal:${process.env.PORT}`
})

export default instance