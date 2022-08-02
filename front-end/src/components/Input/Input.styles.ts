import styled from 'styled-components'

export const input = styled.input`
  width: ${({ width }) => ( width ? width : '300px' )};
  height: ${({ height }) => ( height ? height : '40px' )};
  border-radius: 20px;
  background: #EEF4F3;
  border: 2px solid #EEF4F3;
  outline-width: 0;
  color: #7a7a7a;
  font-size: 1.0rem;
  padding: 0px 20px;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #37B299;
    transition: 0.3s ease-in-out;
    background-color: #f6f9f8;
  }

  &::placeholder {
    color: #c4c4c4;
  }
`