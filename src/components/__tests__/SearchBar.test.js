import { SearchBar } from '../SearchBar';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(cleanup);

const mockHandleChange = jest.fn();
const mockHandleSubmit = jest.fn();

it('<SearchBar>', async () => {
  mockHandleSubmit.mockImplementation((e) => {
    e.preventDefault();
  });

  render(
    <SearchBar
      handleChange={mockHandleChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  expect(screen.getByRole('textbox')).toBeVisible();
  expect(screen.getByRole('button')).toBeVisible();

  const searchbar = screen.getByRole('textbox');

  userEvent.type(searchbar, 'abc');
  expect(searchbar).toHaveValue('abc');
  expect(mockHandleChange).toBeCalledTimes(3);

  // calls function on submit
  userEvent.click(screen.getByRole('button'));
  expect(mockHandleSubmit).toBeCalledTimes(1);
});
