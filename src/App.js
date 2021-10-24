import { Attribution } from './components/Attribution';
import { Top } from './components/Top';
import { MapView } from './components/MapView';

const data = [
  { heading: 'IP Address', body1: '192.212.174.101' },
  { heading: 'Location', body1: 'Brooklyn, NY,', body2: '10001' },
  { heading: 'Timezone', body1: 'UTC-5:00' },
  { heading: 'ISP', body1: 'SpaceX', body2: 'Starlink' },
];

const position = [-27.445, 152.99];

function App() {
  return (
    <div className="App">
      <Top data={data} />
      <MapView position={position} />
      <Attribution />
    </div>
  );
}

export default App;
