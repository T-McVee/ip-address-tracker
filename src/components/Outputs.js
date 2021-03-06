import styled from 'styled-components';
import { Output } from './Output';

export const Outputs = (props) => {
  const { data } = props;

  if (
    !data ||
    (data.status !== 200 &&
      data.status !== 'empty' &&
      data.status !== 'invalid')
  ) {
    return (
      <Aside>
        <P data-testid="error">Network Error</P>
      </Aside>
    );
  } else if (data.status === 'empty') {
    return (
      <Aside>
        <P data-testid="loading">Loading...</P>
      </Aside>
    );
  } else if (data.status === 'invalid') {
    return (
      <Aside>
        <P data-testid="invalid" alert>
          Input not a valid IP address or domain
        </P>
      </Aside>
    );
  }

  return (
    <Aside className="output">
      <Ul>
        {data.outputs.map((output, index) =>
          index !== data.outputs.length - 1 ? (
            <Output key={index} heading={output.heading} body={output.body} />
          ) : (
            <Output
              key={index}
              heading={output.heading}
              body={output.body}
              rightMost="true"
            />
          )
        )}
      </Ul>
    </Aside>
  );
};

const Aside = styled.aside`
  position: relative;
  z-index: 1000;
  top: 35px;
  display: flex;
  align-items: center;
  width: calc(100% - 18rem);
  min-height: 120px;
  background-color: #ffffff;
  border-radius: 14px;
  box-shadow: 0px 4px 6px 1px #3f3f3f3d;
  padding: 1.5rem 0;

  @media screen and (max-width: 820px) {
    width: 100%;
    min-height: fit-content;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 72%;
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    justify-content: center;
    height: fit-content;
  }
`;

const P = styled.p`
  width: 100%;
  color: #000000;
  text-align: center;
  padding: 0;
  font-weight: 500;
  font-size: 1.2rem;
  color: ${(props) => props.alert && '#ad4c4c'};
`;
