import { createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  isError: false,
  currentCity: {}
}

const reducer = function (state, action) {
  switch (action.type) {

    case "data/loading": {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case "dataFetch/Failed": {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }

    // 1.
    case "cities/loaded": {
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }
    }
    case "citiesFetch/Failed": {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    // 2.
    case "city/loaded": {
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    }
    // 3. 
    case "createCity/updateCities": {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload]
      }
    }
    // 4. 
    case "deleteCity/updateCities": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload)
      }
    }

    default: throw new Error()
  }
}

function CitiesProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, isError, currentCity } = state;

  const BASE_URL = "http://localhost:9000";

  useEffect(function () {
    async function getCitiesData() {
      try {

        dispatch({ type: "data/loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });

      } catch (err) {
        dispatch({ type: "dataFetch/Failed" });
      }
    }

    getCitiesData();
  }, [])

  async function getCity(id) {
    try {
      if (currentCity.id === Number(id)) return;
      dispatch({ type: "data/loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });

    } catch (err) {
      dispatch({ type: "dataFetch/Failed" });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "data/loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();

      dispatch({ type: "createCity/updateCities", payload: data });
    } catch (err) {
      dispatch({ type: "dataFetch/Failed" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "data/loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "deleteCity/updateCities", payload: id })
    } catch (err) {
      dispatch({ type: "dataFetch/Failed" });

    }
  }


  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      isError,
      currentCity,
      getCity,
      createCity,
      deleteCity
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

const useCitiesData = function () {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider...which is not acceptable.")
  return context;
}

export { CitiesProvider, useCitiesData };