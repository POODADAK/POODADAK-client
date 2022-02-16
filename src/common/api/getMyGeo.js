const options = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: Infinity,
};

export function getMyLngLat() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

export function watchMyLngLat() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.watchPosition(resolve, reject, options)
  );
}

export function makePosionToLngLat(position) {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;

  return [lng, lat];
}
