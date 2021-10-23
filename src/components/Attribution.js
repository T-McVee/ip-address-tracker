import styled from 'styled-components';

const Link = styled.a`
  font-size: 1rem;
  text-decoration: none;
  color: #1c72b8;
`;

export const Attribution = () => {
  return (
    <div className="attribution">
      Challenge by
      <Link href="https://www.frontendmentor.io?ref=challenge" target="_blank">
        {` `} Frontend Mentor
      </Link>
      . Coded by <Link href="#">Tim McVinish</Link>.
    </div>
  );
};
