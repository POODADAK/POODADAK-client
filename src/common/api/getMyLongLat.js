function getMyLongLat() {
  if (navigator.geolocation) {
    const [long, lat] = navigator.geolocation((position) => [
      position.coords.longitude,
      position.coords.latitude,
    ]);

    return [long, lat];
  }

  throw new Error("navigator.geolocation is not supported!");
}

export default getMyLongLat;
