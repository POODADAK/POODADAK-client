import axios from "axios";

async function getLiveChatByToilet(toiletId) {
  const { data } = await axios.get(
    `/chatroom/live-chatroom?toiletId=${toiletId}`,
    {
      withCredentials: true,
    }
  );

  return data.liveChatRoomInfo;
}

export default getLiveChatByToilet;
