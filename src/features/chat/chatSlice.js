import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentSocket: null,
    currentChatroomId: null,
  },
  reducers: {
    userCreatedChat: (state, action) => {
      state.currentSocket = action.payload.socket;
      state.currentChatroomId = action.payload.chatroomId;
    },
    userClosedChat: (state) => {
      state.currentSocket = null;
      state.currentChatroomId = null;
    },
  },
});

export function disconnectExistingSocket(dispatch, getState) {
  const { myChat } = getState().chat;

  if (myChat) {
    myChat.disconnect();
  }
}

export const { userCreatedChat, userClosedChat } = chatSlice.actions;

export default chatSlice.reducer;
