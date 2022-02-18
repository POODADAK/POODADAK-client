import axios from "axios";

async function getChatroomLiveStatus(chatroomId) {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");
  const { data } = await axios.get(`/chatroom/${chatroomId}`, {
    headers: {
      Authorization: `Bearer ${POODADAK_TOKEN}`,
    },
  });

  return data.chatroom;
}

export default getChatroomLiveStatus;
