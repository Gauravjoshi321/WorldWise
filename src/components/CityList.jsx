import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiesData } from "../contexts/CitiesContext";

const message = "Hiee, Add your first city by clicking on a city on the map";

function CityList () {

  const {cities, isLoading, isError} = useCitiesData();

  if(isLoading) return <Spinner/>;
  if(isError) return <Message message={"Something went wrong... please refresh"}/>;
  if(!cities.length) return <Message message={message}/>;


  return (
    <ul className={styles.cityList}>
     { cities.map(city => (<CityItem city={city} key={city.id}/>))}
    </ul>
  )
}

export default CityList;