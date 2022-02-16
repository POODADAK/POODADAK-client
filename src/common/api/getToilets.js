import axios from "axios";

async function getToilets(center) {
  const { data } = await axios.get(
    `/toilets?lat=${center[0]}&lng=${center[1]}`
  );

  return data.toiletList;
}

export default getToilets;
