function getMyLngLat() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      }, reject);
    } else {
      throw new Error(
        "위치정보를 제공할 수 없습니다. 위치정보를 제공하는 디바이스를 사용하거나 디바이스의 브라우저 위치정보 사용 옵션을 켜주세요."
      );
    }
  });
}

export default getMyLngLat;
