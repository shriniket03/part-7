const baseUrl = '/api/users'
import axios from 'axios'

export const getAll = async () => {
    const res = await axios.get(baseUrl)
    const reso = await res.data
    return reso
}