import styled, {css} from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${props => props.wrap || 'wrap'};

  justify-content: ${props => props.justify || 'auto'};

  ${props => props.grow && css`
    flex-grow: 1;
  `}

  ${props => props.center && css`
    align-items: center;
  `}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  ${props => props.grow && css`
    flex-grow: 1;
  `}

  ${props => props.left && css`
    text-align: left;
  `}

  ${props => props.center && css`
    align-items: center;
  `}
`;

export { Row, Column };
