import { Link, useLocation } from 'react-router-dom';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

const CountryList = ({ countries }) => {
  const location = useLocation()

  return (
    <Grid>
      {countries.map(({ id, country, flag }) => (
        <GridItem key={id}>
          <Link to={`/country/${id}`} state={location}>
            <img src={flag} alt={country} />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};
export default CountryList;
