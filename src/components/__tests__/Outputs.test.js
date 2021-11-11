import { Outputs } from '../Outputs';
import { render, screen, cleanup } from '@testing-library/react';

beforeEach(cleanup);

it('<Outputs>', async () => {
  const fakeData = [
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
  ];

  render(<Outputs data={fakeData} />);

  screen.getByRole('list');
  expect(screen.getAllByRole('listitem').length).toBe(fakeData.length);
  expect(screen.getByText(fakeData[0].heading).textContent).toBe(
    fakeData[0].heading
  );
});

it('<Outputs> with no data', () => {
  render(<Outputs />);

  expect(screen.getByTestId('error').textContent).toBe('Network Error');
});
