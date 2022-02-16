/* eslint-disable no-underscore-dangle */
import { createSlice } from "@reduxjs/toolkit";

import createChatroom from "../../common/api/createChatroom";

export const chatStatusOptions = {
  disconnected: "disconnected",
  connected: "connected",
  connecting: "connecting",
  error: "error",
};

export const socketStatusOptions = {
  disconnected: "disconnected",
  connected: "connected",
};

export const participantStatusOptions = {
  participantLeft: "participantLeft",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatStatus: chatStatusOptions.disconnected,
    socketStatus: socketStatusOptions.disconnected,
    participantStatus: null,
    chatroomId: null,
    chatList: [],
    nameSpace: null,
    owner: null,
    error: { status: null, message: null },
  },
  reducers: {
    userEnteredChatroom: (state, action) => {
      state.chatStatus = chatStatusOptions.connected;
      state.chatroomId = action.payload._id;
      state.chatList = action.payload.chatList;
      state.owner = action.payload.owner;
      state.nameSpace = action.payload.toilet;
      state.participantStatus = null;
    },
    userLeftChatroom: (state) => {
      state.chatStatus = chatStatusOptions.disconnected;
      state.chatroomId = null;
      state.chatList = [];
      state.owner = null;
      state.participant = null;
      state.error = null;
      state.nameSpace = null;
      state.participantStatus = participantStatusOptions.participantLeft;
      state.socketStatus = socketStatusOptions.disconnected;
    },
    chatListLoaded: (state, action) => {
      state.chatList = action.payload;
    },
    chatConnectionFailed: (state, action) => {
      state.chatStatus = chatStatusOptions.error;
      state.error.status = action.payload.status;
      state.error.message = action.payload.message;
      state.participantStatus = null;
    },
    chatConnectionRequestSent: (state) => {
      state.chatStatus = chatStatusOptions.connecting;
      state.error = null;
    },
    errorChecked: (state) => {
      state.error = { status: null, message: null };
      state.chatStatus = chatStatusOptions.disconnected;
    },
    socketOpened: (state) => {
      state.socketStatus = socketStatusOptions.connected;
    },
    socketClosed: (state) => {
      state.socketStatus = socketStatusOptions.disconnected;
    },
    chatReceived: (state, action) => {
      state.chatList = [...state.chatList, action.payload];
    },
  },
});

export const createdChatroom = (toiletId) => async (dispatch) => {
  try {
    const newChatroom = await createChatroom(toiletId);

    dispatch({ type: "chat/userEnteredChatroom", payload: newChatroom });
  } catch (error) {
    dispatch({
      type: "chat/chatConnectionFailed",
      payload: { status: error.status, message: error.message },
    });
  }
};

export const {
  userEnteredChatroom,
  userLeftChatroom,
  chatListLoaded,
  participantJoined,
  chatConnectionFailed,
  chatConnectionRequestSent,
  errorChecked,
  socketOpened,
  socketClosed,
  chatReceived,
  participantLeft,
} = chatSlice.actions;

export default chatSlice.reducer;
