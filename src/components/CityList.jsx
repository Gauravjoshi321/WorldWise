import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

const message = "Hiee, Add your first city by clicking on a city on the map";

function CityList ({cities, isLoading, isError}) {

  if(isLoading) return <Spinner/>;
  if(isError) return <Message message={"Something went wrong... please refresh"}/>;
  else if(!cities.length) return <Message message={message}/>;


  return (
    <ul className={styles.cityList}>
     { cities.map(city => (<CityItem city={city} key={city.id}/>))}
    </ul>
  )
}

export default CityList;