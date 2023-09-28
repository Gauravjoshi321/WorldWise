import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

function CitiesProvider ({children}) {

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      isError
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

const useCitiesData = function () {
  return useContext(CitiesContext);
}

export {CitiesProvider, useCitiesData};