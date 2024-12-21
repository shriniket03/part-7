import { createSlice } from '@reduxjs/toolkit'

const postReducer = createSlice({
    name: 'posts', 
    initialState: [], 
    reducers: {
        setBlogs(state,action){
            return action.payload
        }, 
        appendBlog(state,action){
            state.push(action.payload)
        }, 
        removeBlog(state,action){
            return state.filter(n=>n.id!==action.payload)
        }
    }
})

export default postReducer.reducer
export const { setBlogs, appendBlog, removeBlog } = postReducer.actions