import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import CountryList from '../components/CountryList/CountryList';
import { getCountries } from '../service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountries();
        setCountries(data)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, []);
  console.log(countries);

  return (
    <Section>
      <Container>
        {/* <Heading title="Home" bottom /> */}
        {error && <Heading title="Something went wrong" bottom/>}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
export default Home;
