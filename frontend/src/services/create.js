import axios from 'axios'
const baseUrl = '/api/blogs'

const createNew = async (entry,user) => {
  const response = await axios.post(baseUrl,entry,{ headers: { 'Authorization' : `Bearer ${user.token}` } })
  return response.data
}

export default createNew