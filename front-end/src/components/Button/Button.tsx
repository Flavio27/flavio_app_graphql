import { InputHTMLAttributes } from 'react'
import * as S from './Button.styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export default (props: InputProps) => {
  return (
    <S.Button 
      {...props} 
      type={props.type ? props.type : 'button'}
    />
  )
}