import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/service`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}

const fetchServices = async() => {
    const response = await axios.get(`${API_URL}/service/data`)
    return response.data
}

const fetchServicesById = async(id) => {
    const response = await axios.get(`${API_URL}/service/${id}`)
    return response.data
}

const remove = async(id) => {
    const response = await axios.delete(`${API_URL}/service/${id}`)
    return response.data
}

const modify = async(dataModel) => {
    const { id, formData } = dataModel
    const response = await axios.put(`${API_URL}/service/${id}`, formData)
    return response.data
}

const createCategory = async(formData) => {
    const response = await axios.post(`${API_URL}/service/category`, formData)
    return response.data
}

const fetchCategory = async() => {
    const response = await axios.get(`${API_URL}/service/category`)
    return response.data
}

const removeCategory = async(name) => {
    const response = await axios.delete(`${API_URL}/service/category/${name}`)
    return response.data
}



export { create, fetchServices, fetchServicesById, remove, modify, createCategory, fetchCategory, removeCategory }