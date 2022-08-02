import { Button } from "../Button";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import * as S from "./NewUserForm.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./NewUserForm.schema";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations/User";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";
import { useState } from "react";

interface FormFilters {
  email: String;
  password: String;
  confirmPassword: String;
  name: String;
}

interface CreateUser {
  createUser: string;
}

export default () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFilters>({
    resolver: yupResolver(schema),
  });

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data: CreateUser) => onSuccess(data),
  });

  const [sucess, setSuccess] = useState(false);
  const onSuccess = (data: CreateUser) => {
    reset();
    setSuccess(true);
  };

  const handleLogin = async ({ name, email, password }: FormFilters) => {
    await createUser({
      variables: {
        name,
        email,
        password,
      },
    });
  };

  if (sucess) {
    return (
      <S.SuccessContainer>
        <S.SuccessTitle>Cadastro realizado com sucesso!</S.SuccessTitle>
        <S.Text>
          Um código de verificação temporário foi enviado para o seu <u>email</u>.
        </S.Text>
        <Button
          value="Fazer login"
          style={{marginTop: '50px'}}
          onClick={() => {
            navigate("/");
          }}
        />
      </S.SuccessContainer>
    );
  }

  return (
    <S.LoginForm onSubmit={handleSubmit(handleLogin)}>
      {loading && <Spinner />}
      <IoIosArrowBack
        size={30}
        style={{ cursor: "pointer", marginLeft: "-80%" }}
        onClick={() => {
          navigate("/");
        }}
      />
      <S.Title>Cadastro</S.Title>
      <Input
        {...register("name")}
        placeholder="Nome"
        error={!!errors.name?.message}
      />
      {!!errors.name?.message && (
        <S.ErrorMsg>{errors?.name?.message}</S.ErrorMsg>
      )}
      <Input
        {...register("email")}
        placeholder="Email"
        error={!!errors.email?.message}
      />
      {!!errors.email?.message && (
        <S.ErrorMsg>{errors?.email?.message}</S.ErrorMsg>
      )}
      <Input
        {...register("password")}
        placeholder="Senha"
        type="password"
        error={!!errors.password?.message}
      />
      {!!errors.password?.message && (
        <S.ErrorMsg>{errors.password.message}</S.ErrorMsg>
      )}
      <Input
        {...register("confirmPassword")}
        placeholder="Confirmar senha"
        type="password"
        error={!!errors.confirmPassword?.message}
      />
      {!!errors.confirmPassword?.message && (
        <S.ErrorMsg>{errors.confirmPassword.message}</S.ErrorMsg>
      )}
      <Button value="Cadastrar" type="submit" />
      {!!error && <S.ErrorMsg>{error.message}</S.ErrorMsg>}
    </S.LoginForm>
  );
};
