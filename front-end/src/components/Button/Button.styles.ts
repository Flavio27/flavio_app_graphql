import styled from "styled-components";

export const Button = styled.input`
  background-color: #37B299;
  width: ${({ width }) => ( width ? width : '200px' )};
  height: ${({ height }) => ( height ? height : '50px' )};
  color: #fff;
  border: 2px solid #37B299;
  border-radius: 30px;
  font-size: 1.2rem;
  outline-width: 0;
  cursor: pointer;
  text-align: center;
  
  &:hover, &:focus{
    filter: brightness(1.1);
    transition: 0.3s ease-in-out;
  }

`
