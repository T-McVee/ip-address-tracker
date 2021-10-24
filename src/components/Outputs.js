import styled from 'styled-components';
import { Output } from './Output';

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
`;

export const Outputs = (props) => {
  const { data } = props;

  return (
    <Aside className="output">
      <Ul>
        {data.map((output, index) =>
          index !== 3 ? (
            <Output
              heading={output.heading}
              body1={output.body1}
              body2={output.body2}
            />
          ) : (
            <Output
              heading={output.heading}
              body1={output.body1}
              body2={output.body2}
              rightMost="true"
            />
          )
        )}
      </Ul>
    </Aside>
  );
};
