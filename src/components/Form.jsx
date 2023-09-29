// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import BackButton from "./BackButton";
import styles from "./Form.module.css";
import Button from "./Button";
import { useURLPosition } from "../Hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { lat, lng } = useURLPosition();
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const [emoji, setEmoji] = useState("");


  useEffect(function () {
    async function getCityName() {
      try {
        setGeoCodingError(null);
        setIsLoadingGeolocation(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();

        if (!data.countryCode) throw new Error("Heyy!!! That doesn't seem to be a city. Click somewhere else.")

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

      }
      catch (err) {
        setGeoCodingError(err.message);
      }
      finally {
        setIsLoadingGeolocation(false);
      }
    }
    getCityName();
  }, [lat, lng])

  if (!lat && !lng) return <Message message="Lets start by clicking on map" />;
  if (isLoadingGeolocation) return <Spinner />
  if (geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(new Date())}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
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
