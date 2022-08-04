import { useLazyQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { CONFIRM_EMAIL } from "../../graphql/queries/User";
import * as S from "./ConfirmEmail.styles";

interface FormFilters {
  code: string;
}

interface UserLogin {
  userLogin: {
    token?: String;
    refreshToken?: {
      id: String;
      userId: string;
      expiresIn: Number;
    };
    confirmed?: Boolean;
  };
}

interface LocationState {
  email: string;
  password: string;
}

export const schema = yup.object().shape({
  code: yup
    .string()
    .required("Insira o código de confirmação")
    .matches(/^[0-9]+$/, "O código deve conter apenas números")
    .min(6, "O código deve conter 6 números")
    .max(6, "O código deve conter 6 números"),
});

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFilters>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { email, password } = useLocation().state as LocationState;

  const onLoginSuccess = () => {
    return navigate("/home");
  };

  const [confirmEmail, { loading, error, data, variables }] = useLazyQuery(
    CONFIRM_EMAIL,
    {
      onCompleted: () => onLoginSuccess(),
    }
  );

  const handleConfirm = async ({ code }: FormFilters) => {
    await confirmEmail({
      variables: {
        code: +code,
        email,
      },
    });
  };

  const handleResendCode = () => {};

  return (
    <S.PageContent>
      <S.ConfirmForm onSubmit={handleSubmit(handleConfirm)}>
        <S.Title>Verifique seu email</S.Title>
        <S.Text>
          Olá! Parece que você ainda não confirmou seu email. Para finalizar seu
          cadastro, digite o código de confirmação enviado para seu email, no
          campo abaixo:
        </S.Text>
        <Input
          {...register("code")}
          placeholder="Código de confirmação"
          error={!!errors.code?.message}
        />
        {!!errors.code?.message && (
          <S.ErrorMsg>{errors?.code?.message}</S.ErrorMsg>
        )}
        {!!error && <S.ErrorMsg>{error.message}</S.ErrorMsg>}
        <Button value="Confirmar" type="submit" />
        <S.Text>Ainda não recebeu o código?</S.Text>
        <S.ResendText onClick={handleResendCode}>
          Enviar novo código de confirmação
        </S.ResendText>
      </S.ConfirmForm>
    </S.PageContent>
  );
};
