import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet"
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCitiesData } from "../contexts/CitiesContext";
import { useGeolocation } from "../Hooks/Geolocation";
import Button from "./Button";


function Map() {
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([38.7440505, -9.2421368]);
  const { cities } = useCitiesData();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  }
    = useGeolocation();

  console.log(isLoadingPosition, geolocationPosition);

  const latMap = searchParams.get("lat");
  const lngMap = searchParams.get("lng");

  useEffect(function () {
    if (latMap && lngMap) setMapPosition([latMap, lngMap]);
  }, [latMap, lngMap])


  useEffect(function () {
    if (geolocationPosition !== null)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])

  }, [geolocationPosition])


  return (

    <div className={styles.mapContainer} >

      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Your Location"}
      </Button>

      <MapContainer
        center={mapPosition}
        zoom={6}
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