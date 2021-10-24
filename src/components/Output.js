import styled from 'styled-components';

const Li = styled.li`
  position: relative;
  color: hsl(0, 0%, 17%);
  height: 100%;
  width: calc(100% / 4);
  padding-left: 1rem;
  font-weight: 500;
  border-right: ${(props) => (props.rightMost ? 'none' : '1px solid #e9e9e9')};
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

const Div = styled.div`
  position: relative;
  top: 6px;
  font-size: 1.2rem;
  color: hsl(0, 0%, 17%);
`;

export const Output = (props) => {
  const { heading, body1, body2, rightMost } = props;

  return (
    <Li rightMost={rightMost}>
      <H2>{heading}</H2>
      <Div>{body1}</Div>
      {body2 && <Div>{body2}</Div>}
    </Li>
  );
};