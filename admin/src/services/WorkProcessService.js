import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/procedure`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}

const fetchWorkProcess = async() => {
    const response = await axios.get(`${API_URL}/procedure`)
    return response.data
}

export { create, fetchWorkProcess }