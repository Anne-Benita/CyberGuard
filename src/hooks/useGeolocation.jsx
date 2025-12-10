import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watcher = navigator.geolocation.watchPosition(
      (pos) =>
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => console.error("Geolocation error:", err)
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return position;
}
