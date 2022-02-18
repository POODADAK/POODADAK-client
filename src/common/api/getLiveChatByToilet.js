import axios from "axios";

async function getLiveChatByToilet(
  toiletId,
  populate = "",
  isNullParticipant = false
) {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");
  const { data } = await axios.get(
    `/chatroom/live-chatroom-list?toiletId=${toiletId}&populate=${populate}&isNullParticipant=${isNullParticipant}`,
    {
      headers: {
        Authorization: `Bearer ${POODADAK_TOKEN}`,
      },
    }
  );

  return data.liveChatRoomData;
}

export default getLiveChatByToilet;
