import axios from "axios";

async function editReview(reviewId, editedReview) {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");
  const response = await axios.post(`/review/${reviewId}`, editedReview, {
    headers: {
      Authorization: `Bearer ${POODADAK_TOKEN}`,
    },
  });

  return response;
}

export default editReview;
