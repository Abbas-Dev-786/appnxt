import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/home`, formData)
    return response.data
}

const fetchHome = async() => {
    const response = await axios.get(`${API_URL}/home`)
    return response.data
}


export { create, fetchHome }