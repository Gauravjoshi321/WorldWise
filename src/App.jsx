import { Suspense, lazy } from "react";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import HomePage from './pages/HomePage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import AppLayout from './pages/AppLayout';
// import Login from "./pages/Login";
// import PageNotFound from './pages/PageNotFound';

// import CityList from "./components/CityList";
// import CountryList from "./components/CountryList";
// import City from "./components/City";
// import Form from "./components/Form";
// import SpinnerFullPage from "./components/SpinnerFullPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));


const CityList = lazy(() => import("./components/CityList"));
const CountryList = lazy(() => import("./components/CountryList"));
const City = lazy(() => import("./components/City"));
const Form = lazy(() => import("./components/Form"));
const SpinnerFullPage = lazy(() => import("./components/SpinnerFullPage"));


function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="app" element={<AppLayout />}>

                <Route index element={<Navigate replace to={"cities"} />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />

              </Route>

              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App;