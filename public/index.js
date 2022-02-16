/* eslint-disable no-alert */
/* eslint-disable no-console */
function getMyLongLat() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve([position.coords.longitude, position.coords.latitude]);
    });
  });
}

getMyLongLat().then((result) => {
  alert(result);
});
