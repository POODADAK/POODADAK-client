import axios from "axios";

async function getUserReviewList(userId) {
  const { data } = await axios.get(`/profile/${userId}`);
  return data;
}

export default getUserReviewList;
