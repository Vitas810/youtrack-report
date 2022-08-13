import axios from "axios";
import user from '@/api/login'

axios.defaults.baseURL = 'http://192.168.10.62:8080/api'
axios.interceptors.request.use((config) => {
    config.auth = {
        username: user.username,
        password: user.password
    }
    return config
})

export default axios