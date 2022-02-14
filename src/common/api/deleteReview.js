import axios from "axios";

async function deleteReview(reviewId) {
  const { data } = await axios.delete(`/review/${reviewId}`, {
    withCredentials: true,
  });

  return data;
}

export default deleteReview;
