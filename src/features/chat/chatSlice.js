import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatroomId: null,
    chatList: null,
    owner: null,
    participant: null,
  },
  reducers: {
    userCreatedChat: (state, action) => {
      state.currentSocket = action.payload.socket;
      state.currentChatroomId = action.payload.chatroomId;
    },
    userCheckedChat: (state, action) => {
      state.lastCheckedChatNumber = action.payload;
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
