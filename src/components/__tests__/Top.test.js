import { Top } from '../Top';
import { render, screen, cleanup } from '@testing-library/react';

beforeEach(cleanup);

// const mockHandleChange = jest.fn();

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

it('<Top>', async () => {
  // mockHandleChange.mockImplementation((e) => {});

  render(
    <Top
      data={fakeData}
      // handleChange={mockHandleChange}
    />
  );

  // creates an output for each item in data
  expect(screen.getAllByRole('listitem').length).toBe(fakeData.outputs.length);

  // screen.debug();
});
