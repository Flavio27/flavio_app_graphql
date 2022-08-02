import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email('Formato de email inválido').required('Insira o email'),
  password: yup.string().required('Insira o senha')
})