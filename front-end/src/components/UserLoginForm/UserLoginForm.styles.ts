import styled from 'styled-components'


export const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 500px;
  gap: 10px 0px;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
  padding: 10px;
  `

  export const LoginText = styled.p`
    font-size: 2rem;
    color: #5C5C5C;
    font-weight: 600;
  `

  export const OrContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5C5C5C;
    margin: 10px;
  `

  export const Trace = styled.hr`
    border-top: 1px solid #c9c9c9;
    width: 150px;
    margin: 0px 10px;
  `

export const SignUpButton = styled.input`
  background-color: #EEF4F3;
  width: ${({ width }) => ( width ? width : '200px' )};
  height: ${({ height }) => ( height ? height : '50px' )};
  color: #383838;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  outline-width: 0;
  cursor: pointer;
  text-align: center;
  
  &:hover, &:focus{
    filter: brightness(0.95);
    transition: 0.3s ease-in-out;
  }
`

export const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`
