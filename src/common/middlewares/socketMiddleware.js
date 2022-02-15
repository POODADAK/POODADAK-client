import { io } from "socket.io-client";

import {
  userEnteredChatroom,
  userLeftChatroom,
  chatListLoaded,
  chatConnectionFailed,
  chatConnectionRequestSent,
} from "../../features/chat/chatSlice";

const socketActionType = {
  connected: "socket/connected",
  disconnected: "socket/disconnected",
};

const socketActionCreators = {
  socketConnected: (prefix, namespace, userId, roomDBId = "") => ({
    type: socketActionType.connected,
    payload: {
      prefix,
      namespace,
      userId,
      roomDBId,
    },
  }),
  socketDisconnected: (payload) => ({
    type: socketActionType.disconnected,
    payload,
  }),
};

const socketMiddleware = () => {
  let socket = null;

  return (storeAPI) => (next) => (action) => {
    // console.log("ac", action);
    if (action.type === socketActionType.connected) {
      const { prefix, namespace, userId, roomDBId } = action.payload;

      if (socket) {
        socket.disconnect();
      }

      // console.log(roomDBId);

      socket = io(
        `${process.env.REACT_APP_AXIOS_BASE_URL}/${prefix}-${namespace}?room=${userId}&roomDBId=${roomDBId}`,
        {
          withCredentials: true,
        }
      );

      storeAPI.dispatch(chatConnectionRequestSent());

      socket.on("connect", () => {
        // eslint-disable-next-line no-console
        console.log(`client socketid ${socket.id} is now connected`);
      });

      socket.on("joinChatroom", (chatroom) => {
        // console.log("jc", chatroom);
        storeAPI.dispatch(userEnteredChatroom(chatroom));
      });

      socket.once("findExistingChatList", (chatList) => {
        storeAPI.dispatch(chatListLoaded(chatList));
      });

      socket.on("disconnect", () => {
        // eslint-disable-next-line no-console
        console.log(`client socketid ${socket.id} is now disconnected`);
        storeAPI.dispatch(userLeftChatroom());
      });

      socket.on("db-error", (error) => {
        storeAPI.dispatch(chatConnectionFailed(error));
      });

      socket.on("connect_error", (error) => {
        storeAPI.dispatch(chatConnectionFailed(error));
      });
    }
    next(action);
  };
};

export const { socketConnected, socketDisconnected } = socketActionCreators;

export default socketMiddleware();
