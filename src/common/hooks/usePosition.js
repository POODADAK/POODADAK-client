import { useState, useEffect } from "react";

function usePosition() {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function onChange({ coords }) {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  }

  function onError(err) {
    setError(err.message);
  }

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    const watcher = geo.watchPosition(onChange, onError);

    // eslint-disable-next-line consistent-return
    return () => {
      geo.clearWatch(watcher);
    };
  }, []);

  return { ...position, error };
}

export default usePosition;
