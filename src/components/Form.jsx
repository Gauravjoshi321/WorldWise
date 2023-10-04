// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";

import BackButton from "./BackButton";
import styles from "./Form.module.css";
import Button from "./Button";
import { useURLPosition } from "../Hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesData } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  isLoadingGeolocation: false,
  geoCodingError: null,
  emoji: ""
}

const reducer = function (state, action) {
  switch (action.type) {

    case "geolocation/loading": {
      return {
        ...state,
        geoCodingError: null,
        isLoadingGeolocation: true
      }
    }
    case "geolocation/hasLoaded": {
      const { city, locality, countryName, countryCode } = action.payload
      return {
        ...state,
        isLoadingGeolocation: false,
        cityName: city || locality || "",
        country: countryName,
        emoji: countryCode
      }
    }
    case "geolocation/dataFetchingFailed": {
      return {
        ...state,
        isLoadingGeolocation: false,
        geoCodingError: action.payload,
      }
    }
    case "setCityName/Input": {
      return {
        ...state,
        cityName: action.payload
      }
    }
    case "setDate/Input": {
      return {
        ...state,
        date: action.payload
      }
    }
    case "setNotes/Input": {
      return {
        ...state,
        notes: action.payload
      }
    }

    default: throw new Error("Unknown action")
  }
}

function Form() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    cityName,
    country,
    date,
    notes,
    isLoadingGeolocation,
    geoCodingError,
    emoji
  } = state;

  // const [cityName, setCityName] = useState("");
  // const [country, setCountry] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [notes, setNotes] = useState("");
  // const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  // const [geoCodingError, setGeoCodingError] = useState(null);
  // const [emoji, setEmoji] = useState("");

  const { lat, lng } = useURLPosition();
  const { createCity, isLoading } = useCitiesData();
  const navigate = useNavigate();


  useEffect(function () {
    if (!lat && !lng) return;

    async function getCityName() {
      try {
        dispatch({ type: "geolocation/loading" })
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();

        if (!data.countryCode) throw new Error("Heyy!!! That doesn't seem to be a city. Click somewhere else.")

        const { city, locality, countryName, countryCode } = data;
        dispatch({
          type: "geolocation/hasLoaded",
          payload: { city, locality, countryName, countryCode }
        })

      }
      catch (err) {
        dispatch({ type: "geolocation/dataFetchingFailed", payload: err.message });
      }
    }
    getCityName();
  }, [lat, lng])

  if (!lat && !lng) return <Message message="Lets start by clicking on map" />;
  if (isLoadingGeolocation) return <Spinner />
  if (geoCodingError) return <Message message={geoCodingError} />

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    }

    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleFormSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => dispatch({ type: "setCityName/Input", payload: e.target.value })}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => dispatch({ type: "setDate/Input", payload: date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: "setNotes/Input", payload: e.target.value })}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
