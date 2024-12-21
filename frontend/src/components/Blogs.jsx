import { useSelector } from 'react-redux'
import Blog from './Blog'
import MakeForm from './MakeForm'
import { List } from '@mui/material'
const Blogs = () => {
    const user = useSelector(state=>state.user)
    const blogs = useSelector(state=>state.blogs)
    if (user===null) {
        return null
    }
    else {
        return (
            <div>
                <MakeForm/>
                <br></br>
                <List>
                    {blogs.map(blog=> <Blog key={blog.id} blog={blog}/>)}
                </List>
            </div>
        )
    }
}

export default Blogs