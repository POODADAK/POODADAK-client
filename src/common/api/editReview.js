import axios from "axios";

async function editReview(reviewId, editedReview) {
  const response = await axios.post(`/review/${reviewId}`, editedReview, {
    withCredentials: true,
  });

  return response;
}

export default editReview;
