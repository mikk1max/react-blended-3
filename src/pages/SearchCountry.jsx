import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from '../service/countryApi';
import SearchForm from '../components/SearchForm/SearchForm';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';

const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get('query');

  useEffect(() => {
    if (!region) return;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [region]);

  const handelSubmit = value => {
    setSearchParams({ query: value });
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handelSubmit} />
        {countries.length > 0 && <CountryList countries={countries} />}
        {isLoading && <Loader />}
        {error && <Heading title="Something went wrong ..." bottom />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
