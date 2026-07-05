import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  const [location, setLocation] = useState("los_angeles")

  useEffect(() => {
    fetchData("los_angeles");
  }, []);

  const fetchData = async (location) => {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/?&by_city=${location}`);
    const json = await response.json();

    setList(json.filter(brewery => brewery.brewery_type !== "closed"));
  };

  const handleSearch = query => {
    fetchData(query);
  };

  return (
    <div>
      <table className="brewery-table">
        <thead className="attribute-header">
          <tr className="attributes">
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State/Province</th>
            <th>Country</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody className="search-results">
          {list?.map(brewery => (
            <tr key={brewery.id} className="brewery-entry">
              <td><a href={brewery.website_url}>{brewery.name}</a></td>
              <td>{brewery.address_1}</td>
              <td>{brewery.city}</td>
              <td>{brewery.state_province}</td>
              <td>{brewery.country}</td>
              <td>{brewery.brewery_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;