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
  return (
    <div className="App">
      <Top data={emptyData} />
      {/* <MapView position={position} /> */}
      <Attribution />
    </div>
  );
}

export default App;
