function getMyLongLat() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      }, reject);
    }
    throw new Error("navigator.geolocation is not supported!");
  });
}

export default getMyLongLat;
