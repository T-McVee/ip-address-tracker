import { Output } from '../Output';
import { render, screen, cleanup } from '@testing-library/react';

beforeEach(cleanup);

it('<Output>', () => {
  render(<Output heading={'IP Address'} body={'0.0.0.0'} />);

  expect(screen.getByRole('heading').textContent).toBe('IP Address');
  expect(screen.getByTestId('output-body').textContent).toBe('0.0.0.0');
});

it('<Output> with empty body', () => {
  render(<Output heading="IP Address" body="" />);

  expect(screen.getByRole('heading').textContent).toBe('IP Address');
  expect(screen.getByTestId('output-body').textContent).toBe('Loading...');
});

it('<Output> with no data', () => {
  render(<Output />);

  expect(screen.getByTestId('output-body').textContent).toBe('Loading...');
});
