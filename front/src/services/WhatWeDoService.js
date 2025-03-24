import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/whatwedo`, formData)
    return response.data
}

const fetchWhatWeDo = async() => {
    const response = await axios.get(`${API_URL}/whatwedo`)
    return response.data
}


export { create, fetchWhatWeDo }