import styled from 'styled-components';
import pattern from '../images/pattern-bg.png';

const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 200px;
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
  border-radius: 8px;
  border: none;
  width: 535px;
  padding: 0.5rem 0.75rem;
`;

const Aside = styled.aside`
  position: relative;
  top: 35px;
  width: calc(100% - 16rem);
  height: 260px;
  background-color: #ffffff;
  border-radius: 14px;
  box-shadow: 0px 4px 6px 1px #3f3f3f3d;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  list-style: none;
`;

export const Top = () => {
  return (
    <Header>
      <H1>IP Address Tracker</H1>
      <form action="">
        <Input type="text" placeholder="Search for any IP address or domain" />
      </form>
      <Aside className="output">
        <Ul>
          <li>IP Address</li>
          <li>Location</li>
          <li>
            Timezone UTC {/* add offset value dynamically using the API */}
          </li>
          <li>ISP</li>
        </Ul>
      </Aside>
    </Header>
  );
};
