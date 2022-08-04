import styled from "styled-components"

export const PageContent = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ConfirmForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  max-width: 600px;
  max-height: 500px;
  gap: 20px 0px;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
  padding: 50px;
`

export const Title = styled.p`
font-size: 2rem;
color: #5C5C5C;
font-weight: 600;
`

export const Text = styled.p`
font-size: 1rem;
color: #5C5C5C;
font-weight: 400;
`

export const ResendText = styled.span`
font-size: 0.8rem;
margin-top: -15px;
color: #37B299;
font-weight: 400;
cursor: pointer;
`

export const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`