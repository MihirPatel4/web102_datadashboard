import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const CoinDetail = () => {
  const { symbol } = useParams();
  const [brewery, setBrewery] = useState({});

  useEffect(() => {
    const fetchBrewery = async () => {
      const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${symbol}`);
      const json = await response.json();
      setBrewery(json);
    }

    fetchBrewery().catch(console.error);
  }, [symbol]);

  return (
    <div className="details-container">
      <h1>{brewery?.name}</h1>
      <div className="table-container">
        <table className="details-table">
          <tbody>
            <tr>
              <th>Brewery Type</th>
              <td>{brewery?.brewery_type}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{brewery?.address_1}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{brewery?.city}</td>
            </tr>
            <tr>
              <th>State/Province</th>
              <td>{brewery?.state_province}</td>
            </tr>
            <tr>
              <th>ZIP/Postal Code</th>
              <td>{brewery?.postal_code}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{brewery?.country}</td>
            </tr>
            <tr>
              <th>Coordinate Location</th>
              <td>{brewery?.latitude}, {brewery?.longitude}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{brewery?.phone}</td>
            </tr>
            <tr>
              <th>Website URL</th>
              <td>{brewery?.website_url}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinDetail;