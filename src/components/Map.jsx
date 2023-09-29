import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet"
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCitiesData } from "../contexts/CitiesContext";
import { useGeolocation } from "../Hooks/Geolocation";
import Button from "./Button";
import { useURLPosition } from "../Hooks/useURLPosition";



function Map() {
  const [mapPosition, setMapPosition] = useState([38.7440505, -9.2421368]);
  const { cities } = useCitiesData();
  const { lat, lng } = useURLPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  }
    = useGeolocation();

  useEffect(function () {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng])


  useEffect(function () {
    if (geolocationPosition !== null)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])

  }, [geolocationPosition])


  return (

    <div className={styles.mapContainer} >

      {!geolocationPosition && <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Your Location"}
      </Button>}

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
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <SetMapFocus position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div >
  )
}

function SetMapFocus({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}

export default Map;