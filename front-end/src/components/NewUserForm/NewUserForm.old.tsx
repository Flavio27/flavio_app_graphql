


import { useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"
import { CREATE_USER } from "../../graphql/mutations/User"

export function NewUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault()

    await createUser({
      variables: {
        name,
        email,
        password
      },
      // refetchQueries: [GET_USERS], 
      // Essa é uma opção para não precisar ficar buscando dados no servidor, salvar no cache. E conseguir atualizar do mesmo jeito
      /* update: (cache, { data: { createUser } }) => { 
        const { users } = client.readQuery({ query: GET_USERS })
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [
              ...users,
              createUser
            ]
          }
        })
      }
      */
    })
  }

  if (loading){
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleCreateUser}>
      <label>Nome </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <br/>
      <label>Email </label>
      <input type="text"  value={email} onChange={e => setEmail(e.target.value)}/>
      <br/>
      <label>Password </label>
      <input type="text"  value={password} onChange={e => setPassword(e.target.value)}/>
      <button type="submit">Enviar</button>
      <br/>
      {!!error && <p>Something bad happened</p>}
    </form>
  )
  
}