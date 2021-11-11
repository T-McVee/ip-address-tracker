import styled from 'styled-components';
import { Outputs } from './Outputs';
import { SearchBar } from './SearchBar';
import pattern from '../images/pattern-bg.png';

export const Top = (props) => {
  const { data, handleChange, handleSubmit } = props;

  return (
    <Header>
      <H1>IP Address Tracker</H1>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Outputs data={data} />
    </Header>
  );
};

const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 215px;
  background-image: url(${pattern});
  margin: 0;
  color: #ffffff;
  box-shadow: 0px 4px 6px 1px #3f3f3f3d;
`;

const H1 = styled.h1`
  font-weight: 400;
`;
