import { SearchBar } from '../SearchBar';
import { render, screen, cleanup } from '@testing-library/react';

beforeEach(cleanup);

it('<SearchBar>', async () => {
  render(<SearchBar />);

  expect(screen.getByRole('textbox')).toBeVisible();
  expect(screen.getByRole('button')).toBeVisible();
  screen.debug();
});
