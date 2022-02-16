import axios from "axios";

async function getLiveChatByToilet(
  toiletId,
  populate = "",
  isNullParticipant = false
) {
  const { data } = await axios.get(
    `/chatroom/live-chatroom-list?toiletId=${toiletId}&populate=${populate}&isNullParticipant=${isNullParticipant}`,
    {
      withCredentials: true,
    }
  );

  return data.liveChatRoomData;
}

export default getLiveChatByToilet;
