/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_AXIOS_BASE_URL;

export const getMyChatroom = createAsyncThunk(
  "chat/getMyChatroom",
  async (userId) => {
    try {
      const myChatroom = axios.get(
        `${BASE_URL}/chatroom/live-chatroom-list?userId=${userId}`
      );

      return myChatroom;
    } catch (error) {
      return error;
    }
  }
);

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
  extraReducers: {
    [getMyChatroom.pending]: (state) => {
      state.chatStatus = chatStatusOptions.disconnected;
      state.chatroomId = null;
      state.chatList = [];
      state.owner = null;
      state.error = null;
    },
    [getMyChatroom.fulfilled]: (state, action) => {
      state.chatStatus = chatStatusOptions.connected;
      state.chatroomId = action.payload._id;
      state.chatList = action.payload.chatList;
      state.owner = action.payload.owner;
      state.error = null;
    },
    [getMyChatroom.error]: (state, action) => {
      state.chatStatus = chatStatusOptions.disconnected;
      state.chatroomId = null;
      state.chatList = [];
      state.owner = null;
      state.error = action.payload;
    },
  },
});

export const {
  userEnteredChatroom,
  userLeftChatroom,
  chatListLoaded,
  participantJoined,
  chatConnectionFailed,
  chatConnectionRequestSent,
} = chatSlice.actions;

export default chatSlice.reducer;
