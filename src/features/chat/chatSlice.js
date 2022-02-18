import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import createChatroom from "../../common/api/createChatroom";

export const getMyChatroom = createAsyncThunk(
  "chat/getMyChatroom",
  async (userId) => {
    const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");

    try {
      const myChatroom = axios.get(
        `/chatroom/live-chatroom-list?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${POODADAK_TOKEN}`,
          },
        }
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

export const socketStatusOptions = {
  disconnected: "disconnected",
  connected: "connected",
};

export const participantStatusOptions = {
  participantLeft: "participantLeft",
};

const initialState = {
  chatStatus: chatStatusOptions.disconnected,
  socketStatus: socketStatusOptions.disconnected,
  participantStatus: null,
  chatroomId: null,
  chatList: [],
  nameSpace: null,
  owner: null,
  error: { status: null, message: null },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
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
      state.error = { status: null, message: null };
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
      state.error = { status: null, message: null };
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
  extraReducers: {
    [getMyChatroom.pending]: (state) => {
      state.chatStatus = chatStatusOptions.disconnected;
      state.chatroomId = null;
      state.chatList = [];
      state.owner = null;
      state.error = { status: null, message: null };
    },
    [getMyChatroom.fulfilled]: (state, action) => {
      state.chatStatus = chatStatusOptions.connected;
      state.chatroomId = action.payload._id;
      state.chatList = action.payload.chatList;
      state.owner = action.payload.owner;
      state.error = { status: null, message: null };
    },
    [getMyChatroom.error]: (state, action) => {
      state.chatStatus = chatStatusOptions.disconnected;
      state.chatroomId = null;
      state.chatList = [];
      state.owner = null;
      state.error = {
        status: action.payload.status,
        message: action.payload.message,
      };
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
