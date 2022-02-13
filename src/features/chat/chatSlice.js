import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    myChat: null,
  },
  reducers: {
    userCreatedChat: (state, action) => {
      state.myChat = action.payload;
    },
    userClosedChat: (state) => {
      state.myChat = null;
    },
  },
});

export const { userCreatedChat, userClosedChat } = chatSlice.actions;

export default chatSlice.reducer;
