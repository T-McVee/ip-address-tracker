import styled from 'styled-components';

export const Attribution = () => {
  return (
    <Footer className="attribution">
      Challenge by&nbsp;
      <Link href="https://www.frontendmentor.io?ref=challenge" target="_blank">
        Frontend Mentor
      </Link>
      . Coded by&nbsp; <Link href="#">Tim McVinish</Link>.
    </Footer>
  );
};

const Footer = styled.footer`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 4rem;
`;

const Link = styled.a`
  font-size: 1rem;
  text-decoration: none;
  color: #1c72b8;
`;
