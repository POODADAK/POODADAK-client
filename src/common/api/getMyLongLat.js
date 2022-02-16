function getMyLongLat() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      }, reject);
    } else {
      throw new Error("navigator.geolocation is not supported!");
    }
  });
}

export default getMyLongLat;
