import React from 'react';
import styled from 'styled-components';

export const SearchBar = (props) => {
  const { inputValue, handleChange, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search for any IP address or domain"
        id="ipInput"
        name="ipInput"
        value={inputValue}
        onChange={handleChange}
        required
      />
      <Submit>{`>`}</Submit>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
`;

const Input = styled.input`
  font-size: 18px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: none;
  width: 465px;
  padding: 0.5rem 0.75rem;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 375px) {
    width: calc(100% - 2rem);
    padding: 1rem;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;

const Submit = styled.button`
  background-color: hsl(0, 0%, 17%);
  border: none;
  font-size: 18px;
  padding: 0.5rem 0.75rem;
  color: #ffffff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  &:hover {
    cursor: pointer;
    outline: 1px solid red;
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 375px) {
    padding: 1.1rem;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;
