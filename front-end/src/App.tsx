import { gql, useQuery } from '@apollo/client'
import { NewUserForm } from './components/NewUserForm';

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
    <div>
      <ul>
        {data?.users.map(user => <li>Nome: {user.name} - Email: {user.email}</li>)}
      </ul>
      <NewUserForm/>
    </div>
  )
}

export default App
