import { App } from './App';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://geo.ipify.org/api/v2/country,city', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ip: '174.4.76.7',
        isp: 'Shaw Communications Inc.',
        location: {
          city: 'Kelowna',
          region: 'British Columbia',
          postalCode: '',
          timezone: '-8:00',
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('<App>', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getByText('174.4.76.7')).toBeVisible();
    expect(screen.getByText('Kelowna, British Columbia')).toBeVisible();
    expect(screen.getByText('UTC -8:00')).toBeVisible();
    expect(screen.getByText('Shaw Communications Inc.')).toBeVisible();
  });

  const searchBar = screen.getByRole('textbox');
  const submitButton = screen.getByRole('button');

  // Test a domain as input
  userEvent.type(searchBar, 'pinkbike.com');
  expect(searchBar.value).toBe('pinkbike.com');

  server.use(
    rest.get('https://geo.ipify.org/api/v2/country,city', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ip: '198.90.5.100',
          isp: 'pinkbike.com',
          location: {
            city: 'San Jose',
            region: 'CA',
            postalCode: '95119',
            timezone: '-8:00',
          },
        })
      );
    })
  );

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('198.90.5.100')).toBeVisible();

    // Fix this
    expect(screen.getByText('San Jose, CA , 95119')).toBeVisible();
    expect(screen.getByText('UTC -8:00')).toBeVisible();
    expect(screen.getByText('pinkbike.com')).toBeVisible();
  });

  // Test an IP address as input
  userEvent.type(searchBar, '8.8.8.8');
  expect(searchBar.value).toBe('8.8.8.8');

  server.use(
    rest.get('https://geo.ipify.org/api/v2/country,city', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ip: '8.8.8.8',
          isp: 'Google LLC',
          location: {
            city: 'Mountain View',
            region: 'California',
            postalCode: '94035',
            timezone: '-8:00',
          },
        })
      );
    })
  );

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('8.8.8.8')).toBeVisible();

    // Fix this
    expect(screen.getByText('Mountain View, California , 94035')).toBeVisible();
    expect(screen.getByText('UTC -8:00')).toBeVisible();
    expect(screen.getByText('Google LLC')).toBeVisible();
  });

  // screen.debug();
});
