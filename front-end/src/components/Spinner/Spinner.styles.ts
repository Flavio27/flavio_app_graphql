import styled, { keyframes } from 'styled-components';

const spin = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const breath = keyframes`
 0% { opacity: 1 }
 20% { opacity: 0.2 }
 40% { opacity: 0.4 }
 60% { opacity: 0.6 }
 80% { opacity: 0.8 }
`


export const LoaderContent = styled.div`
    position:fixed;
    width:100%;
    left:0;right:0;top:0;bottom:0;
    background-color: rgba(255,255,255,0.7);
    z-index:9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Loader = styled.div`
  border: 10px solid #EEF4F3;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  border-top: 10px solid #3CC4A8;
`

export const LoaderText = styled.div`
  margin-top: 10px;
  color: #5C5C5C;
  font-size: calc(2px + 2vmin);
  -webkit-animation: ${breath} 3s ease-out infinite normal;
  animation: ${breath} 3s ease-out infinite normal;
`

