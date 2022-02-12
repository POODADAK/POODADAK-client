import axios from "axios";

async function getReview(reviewId) {
  const response = await axios.get(`/review/${reviewId}`);

  return response.data;
}

export default getReview;
