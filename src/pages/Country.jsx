import Container from '../components/Container/Container';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import Heading from '../components/Heading/Heading';
import Loader from '../components/Loader/Loader';
import Section from '../components/Section/Section';

import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from '../service/countryApi';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const { countryId } = useParams();
  const location = useLocation();
  const goBack = useRef(location.state ?? '/');

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      setError(null);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [countryId]);

  return (
    <Section>
      <Container>
        <GoBackBtn path={goBack.current}> Go back </GoBackBtn>
        {loader && <Loader />}
        {country && <CountryInfo {...country} />}
        {error && <Heading title="Something went wrong ..." bottom />}
      </Container>
    </Section>
  );
};

export default Country;
