import { Top } from '../components/Top';
import { App } from '../App';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  within,
} from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

jest.mock('axios');

const data = [
  { heading: 'IP Address', body: '192.212.174.101' },
  { heading: 'Location', body: ['Brooklyn', 'NY', '10001'] },
  { heading: 'Timezone', body: 'UTC-5:00' },
  { heading: 'ISP', body: 'SpaceX Starlink' },
];

// build new fake api response

// new response
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

describe('Handles form submitions correctly', () => {
  it('Updates the ISP after form submit', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const form = screen.getByRole('form');
    const input = within(form).getByRole('textbox');

    const isp = screen.getByText(/Shaw/i);
    expect(isp).toBeVisible();

    await act(async () => {
      fireEvent.change(input, { target: { value: 'pinkbike.com' } });
    });

    axios.get.mockResolvedValue(Promise.resolve(res2));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(isp.textContent).toBe('pinkbike.com');
  });

  it('Updates the Timezone after form submit', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const form = screen.getByRole('form');
    const input = within(form).getByRole('textbox');

    const timezone = screen.getByText(/UTC/i);
    expect(timezone).toBeVisible();

    await act(async () => {
      fireEvent.change(input, { target: { value: 'pinkbike.com' } });
    });

    axios.get.mockResolvedValue(Promise.resolve(res2));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(timezone.textContent).toBe('-07:00');
  });

  it('Updates the Location after form submit', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const form = screen.getByRole('form');
    const input = within(form).getByRole('textbox');

    const location = screen.getByText(/Kelowna/i);
    expect(location).toBeVisible();

    await act(async () => {
      fireEvent.change(input, { target: { value: 'pinkbike.com' } });
    });

    axios.get.mockResolvedValue(Promise.resolve(res2));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(location.textContent).toBe('Squamish, British Columbia');
  });

  it('Updates the IP address after form submit', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const form = screen.getByRole('form');
    const input = within(form).getByRole('textbox');

    const ipAddress = screen.getByText(/174.4.76.7/i);
    expect(ipAddress).toBeVisible();

    await act(async () => {
      fireEvent.change(input, { target: { value: 'pinkbike.com' } });
    });

    axios.get.mockResolvedValue(Promise.resolve(res2));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(ipAddress.textContent).toBe('198.90.5.100');
  });

  it('Rejects bad inputs', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res2));

    act(() => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const inputField = screen.getByPlaceholderText(/Search/i);
    const button = screen.getByRole('button');
    expect(inputField.value).toBe('');
    expect(button).toBeVisible();

    await act(async () => {
      fireEvent.change(inputField, { target: { value: 'dog' } });
    });

    await act(async () => {
      fireEvent.click(button);
    });

    const output = await screen.findByText(/Please check/i);
    expect(output.textContent).toBe(
      'Please check the IP address or domain and try again'
    );
  });
});

describe('Loads data from API on initial load', () => {
  it('Updates the IP Address output', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const ipAddress = await screen.findByText(/174/i);
    expect(ipAddress).toBeVisible();
  });

  it('Updates the Location output', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const location = await screen.findByText(/Kelowna/i);
    expect(location).toBeVisible();
  });

  it('Updates the Timezone output', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const timezone = await screen.findByText(/7:00/i);
    expect(timezone).toBeVisible();
  });

  it('Updates the ISP output', async () => {
    axios.get.mockResolvedValue(Promise.resolve(res1));

    await act(async () => {
      render(
        <App>
          <Top />
        </App>
      );
    });

    const isp = await screen.findByText(/Shaw/i);
    expect(isp).toBeVisible();
  });
});

it('Clears input field on submit', async () => {
  await act(async () => {
    render(
      <App>
        <Top />
      </App>
    );
  });

  const inputField = screen.getByPlaceholderText(/Search/i);
  expect(inputField.value).toBe('');

  await act(async () => {
    fireEvent.change(inputField, { target: { value: 'a' } });
  });
  expect(inputField.value).toBe('a');

  await act(async () => {
    fireEvent.click(screen.getByRole('button'));
  });
  expect(inputField.value).toBe('');
});

it('Input field accepts text', async () => {
  await act(async () => {
    render(
      <App>
        <Top />
      </App>
    );
  });

  const input = screen.getByPlaceholderText(/Search/i);
  expect(input.value).toBe('');

  await act(async () => {
    fireEvent.change(input, { target: { value: 'a' } });
  });

  expect(input.value).toBe('a');
});

it('Loads with empty input field', async () => {
  await act(async () => {
    render(
      <App>
        <Top />
      </App>
    );
  });

  expect(screen.getByPlaceholderText(/Search/i).value).toBe('');
});

/* **** State Template */
const emptyData = [
  { heading: 'IP Address', body: '' },
  {
    heading: 'Location',
    body: '',
  },
  { heading: 'Timezone', body: '' },
  { heading: 'ISP', body: '' },
];
