import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import a from "../services/blogs";
import { initBlog, setNotification } from "../store";
import blogService from "../services/blogs";
import axios from 'axios'
import { Button } from '@mui/material'

const BlogDetails = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  const [inputCom,setInputCom] = useState('')

  const [likes, setLikes] = useState(blog.likes);
  const [comments, setComments] = useState([])

  const submitHandler = async (event) => {
    event.preventDefault()
    const req = {comment: inputCom}
    try {
      const res = await axios.post(`/api/blogs/${id}/comments`, req)
      blogService.getComments(id).then(res=>{
        setComments(res)
      })
    }
    catch (exception) {
      dispatch(setNotification({ msg: "Invalid Input Given", type: "error" }));
    }
  }

  const handleClick = async (blog) => {
    const x = await a.putNew(blog);
    setLikes(x);
    dispatch(initBlog());
  };

  useEffect(() => {
    blogService.getComments(id).then((res) => {
      setComments(res);
    });
  }, []);

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        {`${blog.likes} likes`}{" "}
        <Button sx={{marginLeft:2}} variant="contained" onClick={() => handleClick(blog)}>like</Button>
      </p>
      <p>{`Added by ${blog.users.name}`}</p>

      <h3>comments</h3>
      <form onSubmit={submitHandler}>
        <input
              type="text"
              value={inputCom}
              onChange={({ target }) => setInputCom(target.value)}
        ></input>
        <Button sx={{marginLeft:2}} variant="contained" type='submit'>add comment</Button>
      </form>
      <ul>{comments.map(comment=><li>{comment.comment}</li>)}</ul>
    </div>
  );
};

export default BlogDetails;
