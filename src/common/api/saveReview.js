import axios from "axios";

async function saveReview(newReview) {
  const response = await axios.post("/review", newReview, {
    withCredentials: true,
  });

  return response;
}

export default saveReview;
