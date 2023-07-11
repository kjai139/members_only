import axios from 'axios'


const instance = axios.create({
    baseURL: `https://youthful-reward-production.up.railway.app`
})

export default instance