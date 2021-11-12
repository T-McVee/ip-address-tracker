import { Top } from '../Top';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(cleanup);

const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();

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

it('<Top>', async () => {
  mockHandleChange.mockImplementation((e) => {});

  mockHandleSubmit.mockImplementation((e) => {
    e.preventDefault();
  });

  render(
    <Top
      data={fakeData}
      handleChange={mockHandleChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  // creates an output for each item in data
  expect(screen.getAllByRole('listitem').length).toBe(fakeData.outputs.length);

  const searchBar = screen.getByRole('textbox');

  // screen.debug();
});
