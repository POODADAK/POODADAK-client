import axios from "axios";

export async function getNearToilets(center) {
  const { data } = await axios.get(
    `/toilets?lat=${center[0]}&lng=${center[1]}`
  );

  return data.toiletList;
}

export async function getMapToilets([lat, lng, distance]) {
  const { data } = await axios.get(
    `/toilets/mapToiletsList?lat=${lat}&lng=${lng}&distance=${distance}`
  );

  return data.toiletList;
}
