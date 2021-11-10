import { App } from '../App';
import { MapView } from '../components/MapView';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  act,
} from '@testing-library/react';
import axios from 'axios';

afterEach(cleanup);

jest.mock('axios');

const res1 = {
  data: {
    ip: '174.4.76.7',
    isp: 'Shaw Communications Inc.',
    location: {
      city: 'Kelowna',
      region: 'British Columbia',
      timezone: '-07:00',
    },
  },
};

const res2 = {
  data: {
    ip: '198.90.5.100',
    isp: 'pinkbike.com',
    location: {
      city: 'Squamish',
      region: 'British Columbia',
      timezone: '-07:00',
    },
  },
};

it.skip('Displays the MapView component on load', async () => {
  await act(async () => {
    render(
      <App>
        <MapView />
      </App>
    );
  });

  expect(screen.getByTestId('mapView')).toBeVisible();
  expect(screen.getByRole('presentation')).toBeVisible();
});
