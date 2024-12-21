import { useState, useRef } from "react";
import Togglable from "./Togglable";
import createNew from "../services/create";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store";
import { initBlog } from '../store'
import { Button, TextField } from "@mui/material"

const MakeForm = () => {
  const togglableRef = useRef();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const user = useSelector(state=>state.user)

  const handleFormCreate = async (event) => {
    event.preventDefault();
    togglableRef.current.onButtonClick();
    try {
      const data = await createNew(
        { author: author, url: url, title: title },
        user
      );
      if (data.author) {
        dispatch(initBlog())
        dispatch(setNotification({ msg: `Created ${data.title}`, type: "ok" }));
      }
    } catch (exception) {
      dispatch(setNotification({ msg: "Invalid Input Given", type: "error" }));
    }
  };

  return (
    <Togglable message="create note" ref={togglableRef} altmessage="cancel">
      <form onSubmit={handleFormCreate}>
        <p>
          <TextField
            label="title"
            type="text"
            data-testid="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          <TextField
            label="author"
            type="text"
            data-testid="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          <TextField
            type="text"
            label="url"
            data-testid="url"
            value={url}
            onChange={({ target }) => setURL(target.value)}
          />
        </p>
        <Button variant="contained" type="submit" sx={{marginBottom:2}}>create</Button>
      </form>
    </Togglable>
  );
};


export default MakeForm;
