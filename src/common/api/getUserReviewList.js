import axios from "axios";

async function getUserReviewList(userId) {
  const { data } = await axios.get(`/profile/${userId}`);
  // console.log("=======", data);
  return data;
}

export default getUserReviewList;
