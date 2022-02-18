import axios from "axios";

async function createChatroom(toiletId) {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");
  const { data } = await axios.post(
    `/chatroom/new-chatroom?toiletId=${toiletId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${POODADAK_TOKEN}`,
      },
    }
  );

  return data.newLiveChatroom;
}

export default createChatroom;
