import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  const [location, setLocation] = useState("los_angeles")
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("none");
  const [filteredList, setFilteredList] = useState([]);
  const [currentMode, setCurrentMode] = useState("");
  const [currentTypeCount, setCurrentTypeCount] = useState(0);

  useEffect(() => {
    fetchData("los_angeles");
  }, []);

  const fetchData = async (location) => {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/?&by_city=${location}`);
    const json = await response.json();

    const notClosed = json.filter(brewery => brewery.brewery_type !== "closed");
    setList(notClosed);
    setFilteredList(notClosed);

    //find type count and mode in the list
    const freqMap = {};
    notClosed.forEach(brewery => freqMap[brewery.brewery_type] = (freqMap[brewery.brewery_type] || 0) + 1);

    const count = Object.keys(freqMap).length;
    setCurrentTypeCount(count);

    const mode = Object.keys(freqMap).reduce((a, b) => freqMap[a] > freqMap[b] ? a : b);
    setCurrentMode(mode);
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      const query = searchInput.replaceAll(" ", "_").toLowerCase();
      fetchData(query);
    }
    setFilter("none");
  };

  const handleFilter = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);

    if (newFilter !== "none") {
      const newList = list.filter(brewery => brewery.brewery_type === newFilter);
      setFilteredList(newList);
    }
    else {
      setFilteredList(list);
    }
  };

  // add 2 charts to the dashboard
  //    brewery type, compare brewery count between any 2 cities (user input)
  // make a header component that stays on all pages
  return (
    <div>
      <h2 id="title">Brewery Finder</h2>
      <div className="filters">
        <div className="search">
          <span>Search City:</span>
          <input type="text" placeholder="ex: los angeles" onChange={inputString => setSearchInput(inputString.target.value)}/>
          <button className="search-button" onClick={handleSearch}>🔍</button>
        </div>
        <select name="type" value={filter} onChange={handleFilter}>
          <option value="none">No Filter</option>
          <option value="nano">Nano</option>
          <option value="micro">Micro</option>
          <option value="large">Large</option>
          <option value="regional">Regional</option>
          <option value="contract">Contract</option>
          <option value="proprietor">Proprietor</option>
          <option value="brewpub">Brewpub</option>
          <option value="planning">Planning</option>
        </select>
      </div>
      <div className="stats">
        <p>Results found: {filteredList.length}</p>
        <p>Unique establishment types: {currentTypeCount}</p>
        <p>Most common establishment type: {currentMode}</p>
      </div>
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
          {filteredList.map(brewery => (
            <tr key={brewery.id} className="brewery-entry">
              <td><Link to={`/breweryDetails/${brewery.id}`}>{brewery.name}</Link></td>
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