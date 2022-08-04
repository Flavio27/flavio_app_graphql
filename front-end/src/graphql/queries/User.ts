import { gql } from "@apollo/client"

export const USER_LOGIN = gql`
  query userLogin($email: String! $password: String! ) {
    userLogin(data: { email: $email, password: $password }) {
      token,
      refreshToken {
        id
        userId
        expiresIn
      },
      confirmed
    }
  }
`

export const CONFIRM_EMAIL = gql`
query confirmEmail($email: String! $code: Int!) {
  confirmEmail(email: $email, code: $code){
    token
    refreshToken {
      expiresIn
      id
      userId
    }
  }
}
`