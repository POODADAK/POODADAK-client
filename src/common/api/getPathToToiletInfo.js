import axios from "axios";

async function getPathToToiletInfo(start, end) {
  const queryUrl = `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result&appKey=l7xx66e7421614a24fb5b811213de86ca032`;
  const data = JSON.stringify({
    startName: "현재위치",
    startX: start[0],
    startY: start[1],
    endName: "화장실",
    endX: end[0],
    endY: end[1],
    reqCoordType: "WGS84GEO",
    resCoordType: "EPSG3857",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(queryUrl, data, config);
  const resultData = response.data;

  return resultData;
}

export default getPathToToiletInfo;
