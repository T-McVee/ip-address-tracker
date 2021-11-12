import React from 'react';
import styled from 'styled-components';

export const SearchBar = (props) => {
  const { inputValue, handleChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <Input
          type="text"
          placeholder="Search for any IP address or domain"
          id="ipInput"
          name="ipInput"
          value={inputValue}
          onChange={handleChange}
        />
        <Submit>{`>`}</Submit>
      </div>
    </form>
  );
};

const Input = styled.input`
  font-size: 18px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: none;
  width: 465px;
  padding: 0.5rem 0.75rem;
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
  }
`;
