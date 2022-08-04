import { OperationVariables, useLazyQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { USER_LOGIN } from '../../graphql/queries/User'
import { Button } from '../Button'
import { Input } from '../Input'
import { schema } from './UserLoginForm.schema'
import * as S from './UserLoginForm.styles'

interface FormFilters{
  email: String
  password: String
}
interface UserLogin {
  userLogin: {
    token?: String
    refreshToken?: {
      id: String
      userId: string
      expiresIn: Number
    },
    confirmed?: Boolean
  }
}

export default () => {
  const [email, setEmail] = useState<String>()
  const [password, setPassword] = useState<String>()

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFilters>({
    resolver: yupResolver(schema),
  });

  const onLoginSuccess = ({ userLogin: { confirmed, token, refreshToken}}: UserLogin) => {
    if (!confirmed) {
      return navigate('/confirm-email', {
        state: {email, password} 
      })
    }

    console.log('LOGIN!')

  }

  const [userLogin, { loading, error, data, variables }] = useLazyQuery(USER_LOGIN, {
    onCompleted: (data: UserLogin) => onLoginSuccess(data)
  });

  const handleLogin = async ({ email, password }: FormFilters) => {
    await userLogin({
      variables: {
        email,
        password,
      },
    });

  }

  return (
    <S.LoginForm onSubmit={handleSubmit(handleLogin)}>
      <S.LoginText>Login</S.LoginText>
      {!!error && <S.ErrorMsg>{error.message}</S.ErrorMsg>}
      <Input 
        {...register("email")} 
        placeholder='Email'
        error={!!errors.email?.message}
        onChange={e => setEmail(e.target.value)}
      />
      {!!errors.email?.message && <S.ErrorMsg>{errors?.email?.message}</S.ErrorMsg>}
      <Input 
        {...register("password")}
        placeholder='Senha'
        type="password"
        error={!!errors.password?.message} 
        onChange={e => setPassword(e.target.value)}
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