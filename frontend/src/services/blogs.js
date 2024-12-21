import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getComments = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}/comments`)
  const comm = await request.data
  return comm
}

const deleteBlog = async (blog,token) => {
  try {
    const request = await axios.delete(`${baseUrl}/${blog.id}`, { headers: { 'Authorization' : `Bearer ${token}` } })
    return request
  }
  catch {
    console.log('error')
    return null
  }
}

const putNew = async (blog) => {
  const entry = {
    user: blog.user,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`,entry)
    return response.data.likes
  }
  catch (exception) {
    console.log('error')
    return blog.likes
  }

}

export default { getAll, putNew, deleteBlog, getComments }