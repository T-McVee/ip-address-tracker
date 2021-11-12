import { useEffect, useState } from 'react';
import axios from 'axios';
import { Attribution } from './components/Attribution';
import { Top } from './components/Top';
import { MapView } from './components/MapView';

const emptyData = {
  status: '',
  outputs: [
    { heading: 'IP Address', body: '' },
    { heading: 'Location', body: '' },
    { heading: 'Timezone', body: '' },
    { heading: 'ISP', body: '' },
  ],
};

export function App() {
  const [ipData, setIpData] = useState(emptyData);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getData();
      updateIpData(data);
    })();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const getData = async (query = '') => {
    const response = await axios(
      `http://ip-api.com/json/${query}?fields=status,message,region,city,zip,lat,lon,offset,isp,query`
    );

    return response.data;
  };

  const updateIpData = (data) => {
    console.log(data);
    setIpData({
      status: data.status,
      outputs: [
        { heading: 'IP Address', body: data.query },
        {
          heading: 'Location',
          body: `${data.city}, ${data.region}, ${data.zip}`,
        },
        { heading: 'Timezone', body: `UTC ${data.offset / 3600}:00` },
        { heading: 'ISP', body: data.isp },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await getData(e.target.ipInput.value);
    updateIpData(data);

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
const ipRegex =
  /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/;

const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
 */
