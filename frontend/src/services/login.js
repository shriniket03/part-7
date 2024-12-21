import axios from 'axios'
const baseUrl = '/api/login'

const getLogin = async (user,pass) => {
  const credentials = { username: user, password: pass }
  const response = await axios.post(baseUrl,credentials)
  return (response.data.token) ? response.data : null
}

export default getLogin