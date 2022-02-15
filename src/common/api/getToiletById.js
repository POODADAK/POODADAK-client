import axios from "axios";

async function getToiletById(toiletId) {
  const { data } = await axios.get(`/toilets/${toiletId}`);

  return data.toilet;
}

export default getToiletById;
