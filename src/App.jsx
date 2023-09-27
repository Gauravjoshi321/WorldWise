import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App () {
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
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="app" element={<AppLayout/>}>

          <Route index element={<CityList cities={cities} isLoading={isLoading} isError={isError}/>}/>
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} isError={isError}/>}/>
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} isError={isError}/>}/>
          <Route path="cities/:id" element={<City/>}/>
          <Route path="form" element={<Form/>}/>

        </Route>

        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;