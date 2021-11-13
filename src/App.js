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
  location: {
    lat: 0,
    lng: 0,
  },
};

const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

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
    const formatLocationBody = (body) => {
      const { city, region, postalCode } = body;

      if (postalCode) return [city, region, postalCode].join(', ');
      return [city, region].join(', ');
    };

    setIpData({
      status: res.status,
      outputs: [
        { heading: 'IP Address', body: res.data.ip },
        {
          heading: 'Location',
          body: formatLocationBody(res.data.location),
        },
        { heading: 'Timezone', body: `UTC ${res.data.location.timezone}` },
        { heading: 'ISP', body: res.data.isp },
      ],
      location: {
        lat: res.data.location.lat,
        lng: res.data.location.lng,
      },
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
        setIpData({
          status: 'empty',
          location: {
            lat: ipData.location.lat,
            lng: ipData.location.lng,
          },
        });

        const data = await getData(inputValue);
        updateIpData(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setIpData({
        status: 'invalid',
        location: {
          lat: ipData.location.lat,
          lng: ipData.location.lng,
        },
      });
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
      <MapView position={[ipData.location.lat, ipData.location.lng]} />
      <Attribution />
    </div>
  );
}

export default App;
