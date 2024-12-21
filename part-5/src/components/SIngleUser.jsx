import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleUser = () => {
    const id = useParams().id
    const users = useSelector(state=>state.users)
    const user = users.find(use=>use.id===id)
    const blogs = useSelector(state=>state.blogs)
    const userblogs = blogs.filter(blog=>blog.users.id===user.id)
    return (
        <div>
            <h1>{user.name}</h1>
            <h3>added blogs</h3>
            <ul>{userblogs.map(blog=><li>{blog.title}</li>)}</ul>
        </div>
    )
}

export default SingleUser