import React, { InputHTMLAttributes, useRef } from 'react'
import * as S from './Input.styles'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface CustomInputProps extends InputProps{
  error?: boolean;
}


export default React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  return (
    <S.input 
      ref={ref} 
      {...props}
      style={{border: props.error ? '2px solid #ffaaaa' : ''}}
    />
  );
})
