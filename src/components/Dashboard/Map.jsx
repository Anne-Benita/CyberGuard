import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"; // works with React-Leaflet v3
import { Icon, divIcon, point } from "leaflet";
import placeholderIcon from "../../assets/placeholder.png";

// custom marker icon
const customIcon = new Icon({ iconUrl: placeholderIcon, iconSize: [38, 38] });

// custom cluster icon
const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 text-white text-lg font-bold shadow-lg">${cluster.getChildCount()}</span>`,
    className: "",
    iconSize: point(40, 40, true),
  });
};

const markers = [
  { geocode: [48.86, 2.3522], popUp: "Hello 1" },
  { geocode: [48.85, 2.3522], popUp: "Hello 2" },
  { geocode: [48.855, 2.34], popUp: "Hello 3" },
];

export default function Map() {
  return (
    <div className="h-[90vh] w-full max-w-6xl mx-auto rounded-3xl overflow-hidden border-2 border-gray-300 shadow-lg">
      <MapContainer center={[48.8566, 2.3522]} zoom={13} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
          {markers.map((marker, i) => (
            <Marker key={i} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
