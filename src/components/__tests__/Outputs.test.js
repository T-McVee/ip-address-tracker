import { Outputs } from '../Outputs';
import { render, screen, cleanup } from '@testing-library/react';

beforeEach(cleanup);

it('<Outputs>', () => {
  const fakeData = {
    status: 'success',
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

it('<Outputs> with no data', () => {
  render(<Outputs />);

  expect(screen.getByTestId('error').textContent).toBe('Network Error');
});
