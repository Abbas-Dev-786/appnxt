import { API_URL } from '../util/API_URL'
import axios from 'axios'

const create = async(formData) => {
    const response = await axios.post(`${API_URL}/project`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
}

const fetchProjects = async() => {
    const response = await axios.get(`${API_URL}/project`)
    return response.data
}

const fetchProjectsById = async(id) => {
    const response = await axios.get(`${API_URL}/project/${id}`)
    return response.data
}

const remove = async(id) => {
    const response = await axios.delete(`${API_URL}/project/${id}`)
    return response.data
}

const modify = async(dataModel) => {
    const { id, formData } = dataModel
    const response = await axios.put(`${API_URL}/project/${id}`, formData)
    return response.data
}



export { create, fetchProjects, fetchProjectsById, remove, modify }