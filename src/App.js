import { useEffect, useState } from 'react';
import axios from 'axios';
import { Attribution } from './components/Attribution';
import { Top } from './components/Top';
import { MapView } from './components/MapView';

const emptyData = {
  status: 'empty',
  outputs: [
    { heading: 'IP Address', body: '' },
    { heading: 'Location', body: '' },
    { heading: 'Timezone', body: '' },
    { heading: 'ISP', body: '' },
  ],
};

const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const ipRegex =
  /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/;

const apiUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=';
const API_KEY = 'at_j7OHAU0gh6B3MWmLWACL5V1GpNN7c';

export function App() {
  const [ipData, setIpData] = useState(emptyData);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function initialRequest() {
      const data = await getData();
      updateIpData(data);
    }

    initialRequest();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateIpData = (res) => {
    setIpData({
      status: res.status,
      outputs: [
        { heading: 'IP Address', body: res.data.ip },
        {
          heading: 'Location',
          body: `${res.data.location.city}, ${res.data.location.region}
         ${
           res.data.location.postalCode && `, ${res.data.location.postalCode}`
         }`,
        },
        { heading: 'Timezone', body: `UTC ${res.data.location.timezone}` },
        { heading: 'ISP', body: res.data.isp },
      ],
    });
  };

  const getData = async (input) => {
    let query = `${apiUrl}${API_KEY}`;

    if (urlRegex.test(input)) query += `&domain=${input}`;

    if (ipRegex.test(input)) query += `&ipAddress=${input}`;

    const response = await axios(query);

    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check for valid domain or IP address
    if (urlRegex.test(inputValue) || ipRegex.test(inputValue)) {
      try {
        setIpData({ status: 'empty' });
        const data = await getData(inputValue);
        updateIpData(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setIpData({ status: 'invalid' });
    }

    setInputValue('');
  };

  return (
    <div className="App">
      <Top
        data={ipData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      {/* <MapView position={[0, 0]} /> */}
      <Attribution />
    </div>
  );
}

export default App;

/* 


 */
