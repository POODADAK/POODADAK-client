/* eslint-disable no-alert */
/* eslint-disable no-console */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log("lat:", lat, "lng:", lng);
        alert("lat:", lat, "lng:", lng);
      },
      (error) => {
        console.log(error);
        alert(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    console.log("no GPS");
    alert("no GPS");
  }
}

getLocation();
