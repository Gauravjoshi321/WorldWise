import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import styles from "./Map.module.css";
import { useState } from "react";

function Map() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([28.7494232, 77.1988557]);

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  return (

    <div className={styles.mapContainer} >
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map;