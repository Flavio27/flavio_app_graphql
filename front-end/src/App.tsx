import { gql, useQuery } from '@apollo/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ConfirmEmail } from './pages/ConfirmEmail';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

type User = {
  id: string;
  name: string;
  email: string;
}

type Data = {
  users: User[]
}

export const GET_USERS = gql`
  query{
    users {
      id
      name
      email
    }
  }
`

function App() {
  const { data, loading } = useQuery<Data>(GET_USERS)

  if (loading){
    return <p>Loading...</p>
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}>
        <Route index element={<Login />} />
      </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="confirm-email" element={<ConfirmEmail />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
