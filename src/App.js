import { useState, useEffect } from 'react';
import axios from 'axios';
import { Attribution } from './components/Attribution';
import { Top } from './components/Top';
import { MapView } from './components/MapView';

const ipRegex =
  /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/;

const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const apiRequest = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ToHkwwuUlD7cp7WxRk61Gd38NGTf6`;

const emptyData = [
  { heading: 'IP Address', body: '' },
  { heading: 'Location', body: '' },
  { heading: 'Timezone', body: '' },
  { heading: 'ISP', body: '' },
];

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [ipData, setIpData] = useState(emptyData);
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    makeRequest(apiRequest);
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const getData = async (client, query) => {
    if (!query) return;

    try {
      const res = await client.get(query);
      return res;
    } catch (error) {
      alert(error);
    }
  };

  const makeRequest = (query) => {
    getData(axios, query)
      .then((res) => {
        setIpData([
          { heading: 'IP Address', body: res.data.ip },
          {
            heading: 'Location',
            body: [
              res.data.location.city,
              res.data.location.region,
              res.data.location.postalCode,
            ],
          },
          { heading: 'Timezone', body: `UTC ${res.data.location.timezone}` },
          { heading: 'ISP', body: res.data.isp },
        ]);
        setPosition([res.data.location.lat, res.data.location.lng]);
      })
      .catch((error) => {
        setIpData([
          {
            heading: 'Invalid Query',
            body: ['Please check the IP address or domain and try again'],
          },
        ]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check input format to determine if input is IP or domain
    let query;
    if (inputValue === '') {
      query = apiRequest;
    } else if (ipRegex.test(inputValue)) {
      query = `${apiRequest}&ipAddress=${inputValue}`;
    } else if (urlRegex.test(inputValue)) {
      query = `${apiRequest}&domain=${inputValue}`;
    } else {
      setIpData([{ heading: 'IP Address', body: ['Invalid Domain'] }]);
    }

    // Reset form and ipData
    setInputValue('');
    setIpData(emptyData);

    // send request for data
    makeRequest(query);
  };

  return (
    <div className="App">
      <Top
        data={ipData}
        inputValue={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <MapView position={position} />
      <Attribution />
    </div>
  );
}

export default App;
