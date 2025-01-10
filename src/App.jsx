import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/Home'));
const CountryPage = lazy(() => import('./pages/Country'));
const SearchCountryPage = lazy(() => import('./pages/SearchCountry'));

export const App = () => {
  return (
    <>
    <Header />
     <Suspense fallback={<Loader/>}>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/country" element={<SearchCountryPage />} />
          <Route path="/country/:countryId" element={<CountryPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
     </Suspense>
    </>
  );
};
