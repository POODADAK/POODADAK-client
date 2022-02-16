import axios from "axios";

async function getChatroomLiveStatus(chatroomId) {
  const { data } = await axios.get(`/chatroom/${chatroomId}`, {
    withCredentials: true,
  });

  return data.chatroom;
}

export default getChatroomLiveStatus;
