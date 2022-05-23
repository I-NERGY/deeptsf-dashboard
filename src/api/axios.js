import axios from 'axios'

const BASE_URL = process.env.AUTH_URD || ''
const BASE_URL_SECOND = process.env.RDF_POOL_BC_URL || ''

export default axios.create({
    baseURL: BASE_URL
})

export const axiosSecond = axios.create({
    baseURL: BASE_URL_SECOND
})