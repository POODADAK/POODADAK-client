import axios from "axios";

async function createChatroom(toiletId) {
  const { data } = await axios.post(
    `/chatroom/new-chatroom?toiletId=${toiletId}`,
    {},
    { withCredentials: true }
  );

  return data.newLiveChatroom;
}

export default createChatroom;
