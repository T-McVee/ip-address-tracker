import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

export const Output = (props) => {
  const { heading, body, rightMost } = props;

  useEffect(() => {
    console.log(P);
  }, [body]);

  return (
    <Li rightMost={rightMost}>
      <H2>{heading}</H2>
      <P data-testid="output-body">{body ? body : 'Loading...'}</P>
    </Li>
  );
};

// Fade in
const fadeIn = keyframes`
from {
  transform: scale(0.95);
  opacity: 0;
}

to {
  transform: scale(1);
  opacity: 1;
}
`;

const Li = styled.li`
  position: relative;
  color: hsl(0, 0%, 17%);
  height: 100%;
  width: 100%;
  padding-left: 1rem;
  font-weight: 500;
  border-right: ${(props) => (props.rightMost ? 'none' : '1px solid #e9e9e9')};

  @media screen and (max-width: 820px) {
    text-align: center;
    padding: 1rem 0 1.2rem;
  }
`;

const H2 = styled.h2`
  position: relative;
  top: -6px;
  color: hsl(0, 0%, 59%);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0 0 0rem;
`;

const P = styled.p`
  position: relative;
  top: 6px;
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  color: hsl(0, 0%, 17%);
  animation: ${fadeIn} 0.3s linear;

  @media screen and (max-width: 820px) {
    font-size: 1.2rem;
  }
`;
