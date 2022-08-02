import React from "react";
import * as S from "./Spinner.styles";

export const Spinner = () => {
  return (
    <S.LoaderContent>
      <S.Loader/>
      <S.LoaderText>Carregando...</S.LoaderText>
    </S.LoaderContent>
  );
}
