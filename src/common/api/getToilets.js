import axios from "axios";

export async function getNearToilets(lat, lng) {
  const { data } = await axios.get(`/toilets?lat=${lat}&lng=${lng}`);

  return data.toiletList;
}

export async function getMapToilets(lat, lng, distance) {
  const { data } = await axios.get(
    `/toilets/mapToiletsList?lat=${lat}&lng=${lng}&distance=${distance}`
  );

  return data.toiletList;
}
