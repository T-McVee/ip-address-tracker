import { Attribution } from './components/Attribution';
import { Top } from './components/Top';
import { Map } from './components/Map';

const data = [
  { heading: 'IP Address', body1: '192.212.174.101' },
  { heading: 'Location', body1: 'Brooklyn, NY,', body2: '10001' },
  { heading: 'Timezone', body1: 'UTC-5:00' },
  { heading: 'ISP', body1: 'SpaceX', body2: 'Starlink' },
];

function App() {
  return (
    <div className="App">
      <Top data={data} />
      <Map />
      <Attribution />
    </div>
  );
}

export default App;
