import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentSocket: null,
    currentChatroomId: null,
    lastCheckedChatNumber: null,
    hasUncheckedChat: null,
  },
  reducers: {
    userCreatedChat: (state, action) => {
      state.currentSocket = action.payload.socket;
      state.currentChatroomId = action.payload.chatroomId;
    },
    userCheckedChat: (state, action) => {
      state.lastCheckedChatNumber = action.payload;
    },
    userReceivedChat: (state, action) => {
      state.hasUncheckedChat = state.lastCheckedChatNumber < action.payload;
    },
    userClosedChat: (state) => {
      state.currentSocket = null;
      state.currentChatroomId = null;
      state.lastCheckedChatNumber = null;
      state.hasUncheckedChat = null;
    },
  },
});

export function disconnectExistingSocket(dispatch, getState) {
  const { myChat } = getState().chat;

  if (myChat) {
    myChat.disconnect();
  }
}

export const {
  userCreatedChat,
  userClosedChat,
  userCheckedChat,
  userReceivedChat,
} = chatSlice.actions;

export default chatSlice.reducer;
