/* eslint-disable no-underscore-dangle */
import { createSlice } from "@reduxjs/toolkit";

export const chatStatusOptions = {
  disconnected: "disconnected",
  connected: "connected",
  connecting: "connecting",
  error: "error",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatStatus: chatStatusOptions.disconnected,
    chatroomId: null,
    chatList: [],
    owner: null,
    error: null,
  },
  reducers: {
    userEnteredChatroom: (state, action) => {
      state.status = chatStatusOptions.connected;
      state.chatroomId = action.payload._id;
      state.chatList = action.payload.chatList;
      state.owner = action.payload.owner;
    },
    userLeftChatroom: (state) => {
      state.status = chatStatusOptions.disconnected;
      state.chatroomId = null;
      state.chatList = null;
      state.owner = null;
      state.participant = null;
      state.error = null;
    },
    chatListLoaded: (state, action) => {
      state.chatList = action.payload;
    },
    chatConnectionFailed: (state, action) => {
      state.chatStatus = chatStatusOptions.error;
      state.error = action.payload;
    },
    chatConnectionRequestSent: (state) => {
      state.chatList = chatStatusOptions.connecting;
      state.error = null;
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
  userEnteredChatroom,
  userLeftChatroom,
  chatListLoaded,
  participantJoined,
  chatConnectionFailed,
  chatConnectionRequestSent,
} = chatSlice.actions;

export default chatSlice.reducer;
