import axios from "@/api/axios";

const getTasks = url => {
    return axios.get(url).then(response => response.data)
}

export default {
    getTasks
}