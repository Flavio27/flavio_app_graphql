import { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as S from './UserLoginForm.styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './UserLoginForm.schema'
import { NewUserForm } from '../NewUserForm'
import { useNavigate } from 'react-router-dom';

interface FormFilters{
  email: String
  password: String
}
export default () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFilters>({
    resolver: yupResolver(schema),
  });


  const handleLogin = (data: any) => {
    console.log({data, errors})
  }


  return (
    <S.LoginForm onSubmit={handleSubmit(handleLogin)}>
      <S.LoginText>Login</S.LoginText>
      <Input 
        {...register("email")} 
        placeholder='Email'
        error={!!errors.email?.message}
      />
      {!!errors.email?.message && <S.ErrorMsg>{errors?.email?.message}</S.ErrorMsg>}
      <Input 
        {...register("password")}
        placeholder='Senha'
        type="password"
        error={!!errors.password?.message} 
      />
      {!!errors.password?.message && <S.ErrorMsg>{errors.password.message}</S.ErrorMsg>}
      <Button 
        value='Entrar' 
        type='submit'
      />
      <S.OrContainer>
      <S.Trace/>
      <span> ou </span>
      <S.Trace/>
      </S.OrContainer>
      <S.SignUpButton 
        value='Cadastre-se' 
        onClick={() => navigate('/signup')}
      />
      
    </S.LoginForm>
  )
}