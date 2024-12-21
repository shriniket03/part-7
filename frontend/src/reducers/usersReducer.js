import { createSlice } from '@reduxjs/toolkit'
const usersReducer = createSlice({
    name: 'users', 
    initialState: [], 
    reducers: {
        setUsersRed(state,action) {
            return action.payload
        }
    }
})

export default usersReducer.reducer
export const {setUsersRed} = usersReducer.actions