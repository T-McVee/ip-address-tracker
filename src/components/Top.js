import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: blue;
  margin: 0;
  color: #ffffff;
`;

const H1 = styled.h1``;

export const Top = () => {
  return (
    <Header>
      <h1>IP Address Tracker</h1>
      <form action="">
        <input type="text" placeholder="Search for any IP address or domain" />
      </form>
      <aside className="output">
        <ul>
          <li>IP Address</li>
          <li>Location</li>
          <li>
            Timezone UTC {/* add offset value dynamically using the API */}
          </li>
          <li>ISP</li>
        </ul>
      </aside>
    </Header>
  );
};
