import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiesData } from "../contexts/CitiesContext";

function CountryList () {

  const {cities, isLoading, isError} = useCitiesData();

  if(isLoading) return <Spinner/>;
  if(isError) return <Message message={"Something went wrong... please refresh"}/>
  if(!cities.length) return <Message message={"Hiee, Add your first city by clicking on a city on the map"}/>;

  const countries = cities.reduce((arr, city) => {
    if(!arr.map(el => el.country).includes(city.country)){
      return [...arr, {country: city.country, emoji: city.emoji, id: city.id}]
    }
    else return arr;
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.id}/>
      ))}
    </ul>
  )
}

export default CountryList;