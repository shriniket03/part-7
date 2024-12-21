import { createSlice } from "@reduxjs/toolkit";

const notifReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
  },
});

export default notifReducer.reducer;
export const { setMessage } = notifReducer.actions;
