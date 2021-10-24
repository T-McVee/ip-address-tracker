import styled from 'styled-components';
import { Outputs } from './Outputs';
import pattern from '../images/pattern-bg.png';

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

const Input = styled.input`
  font-size: 18px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: none;
  width: 465px;
  padding: 0.5rem 0.75rem;
`;

const Submit = styled.input`
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

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  /* border: 1px solid red; */
`;

const Li = styled.li`
  color: hsl(0, 0%, 17%);
  height: 100%;
  width: calc(100% / 4);
  padding-left: 1rem;
  font-size: 0.6rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 700;
  color: #b6b6b6;
  border-right: 1px solid #e9e9e9;
`;

export const Top = (props) => {
  const { data } = props;

  return (
    <Header>
      <H1>IP Address Tracker</H1>
      <form action="">
        <div className="form-control">
          <Input
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <Submit type="submit" value=">" />
        </div>
      </form>
      <Outputs data={data} />
    </Header>
  );
};
