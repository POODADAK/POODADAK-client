import axios from "axios";

async function getLiveChatByToilet(toiletId) {
  const { data } = await axios.get(
    `/chatroom/live-chatroom-list?toiletId=${toiletId}`,
    {
      withCredentials: true,
    }
  );

  return data.liveChatRoomData;
}

export default getLiveChatByToilet;
