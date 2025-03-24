import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/counter`, formData)
    return response.data
}

const fetchCounter = async() => {
    const response = await axios.get(`${API_URL}/counter`)
    return response.data
}

export { create, fetchCounter }