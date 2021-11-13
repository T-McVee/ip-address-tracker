import { Outputs } from '../Outputs';
import { render, screen, cleanup } from '@testing-library/react';

beforeEach(cleanup);

it('<Outputs>', () => {
  const fakeData = {
    status: 200,
    outputs: [
      {
        heading: 'heading one',
        body: 'body one',
      },
      {
        heading: 'heading two',
        body: 'body two',
      },
      {
        heading: 'heading three',
        body: 'body three',
      },
    ],
  };

  render(<Outputs data={fakeData} />);

  expect(screen.getByRole('list')).toBeVisible();
  expect(screen.getAllByRole('listitem').length).toBe(fakeData.outputs.length);
  expect(screen.getByText(fakeData.outputs[0].heading).textContent).toBe(
    fakeData.outputs[0].heading
  );
});

it('<Outputs> loading state', () => {
  const fakeData = {
    status: 'empty',
    outputs: [
      {
        heading: '',
        body: '',
      },
      {
        heading: '',
        body: '',
      },
      {
        heading: '',
        body: '',
      },
    ],
  };

  render(<Outputs data={fakeData} />);

  expect(screen.getByTestId('loading').textContent).toBe('Loading...');
});

it('<Outputs> invalid state', () => {
  const fakeData = {
    status: 'invalid',
  };

  render(<Outputs data={fakeData} />);

  expect(screen.getByTestId('invalid').textContent).toBe(
    'Input not a valid IP address or domain'
  );
});

it('<Outputs> with no data', () => {
  render(<Outputs />);

  expect(screen.getByTestId('error').textContent).toBe('Network Error');
});
