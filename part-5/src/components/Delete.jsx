import blogService from '../services/blogs'
import {initBlog} from '../store'
import {useDispatch,useSelector} from 'react-redux'
import { Button } from "@mui/material"

const Delete = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const deleteHandler = async (blog,token) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const x = await blogService.deleteBlog(blog,token)
      dispatch(initBlog())
    }
    return null
  }
  if (user.username === props.blogger.username) {
    return <Button variant="contained" onClick={() => deleteHandler(props.blog, user.token)}>remove</Button>
  }
  else {
    return null
  }
}

export default Delete