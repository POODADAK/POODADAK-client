import axios from "axios";

async function saveReview(newReview) {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");
  const response = await axios.post("/review", newReview, {
    headers: {
      Authorization: `Bearer ${POODADAK_TOKEN}`,
    },
  });

  return response;
}

export default saveReview;
