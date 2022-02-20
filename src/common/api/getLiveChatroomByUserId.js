import axios from "axios";

async function getLiveChatroomByUserId() {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");
  const { data } = await axios.get("/chatroom/live-chatroom", {
    headers: {
      Authorization: `Bearer ${POODADAK_TOKEN}`,
    },
  });

  return data.liveChatRoomData;
}

export default getLiveChatroomByUserId;
