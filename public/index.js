/* eslint-disable no-console */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log("lat:", lat, "lng:", lng);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    console.log("no GPS");
  }
}

getLocation();
