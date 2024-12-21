import {Link} from 'react-router-dom'
import { ListItem } from '@mui/material'
const Blog = ({ blog, key}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <ListItem style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </ListItem>
  );
};

export default Blog;
