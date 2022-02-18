import axios from "axios";

async function deleteReview(reviewId) {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");
  const { data } = await axios.delete(`/review/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${POODADAK_TOKEN}`,
    },
  });

  return data;
}

export default deleteReview;
