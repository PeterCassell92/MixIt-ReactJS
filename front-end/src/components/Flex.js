import styled, {css} from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${props => props.wrap || 'wrap'};

  justify-content: ${props => props.justify || 'start'};

  ${props => props.grow && css`
    flex-grow: 1;
  `}

  ${props => props.center && css`
    align-items: center;
  `}

  ${props => props.width && css`
    width: ${props.width};
  `}

  ${props => props.height && css`
    height: ${props.height};
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
