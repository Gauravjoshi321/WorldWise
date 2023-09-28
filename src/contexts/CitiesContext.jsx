import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

function CitiesProvider ({children}) {

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:9000";

  useEffect(function () {
    async function getCitiesData() {
      try{

      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      setCities(data);

      }catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
  }

  getCitiesData();
  }, [])

  async function getCity(id) {
    try{
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);

      }catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      setIsLoading,
      isError,
      currentCity,
      getCity
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

const useCitiesData = function () {
   const context = useContext(CitiesContext);
   if(context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider...which is not acceptable.")
   return context;
}

export {CitiesProvider, useCitiesData};