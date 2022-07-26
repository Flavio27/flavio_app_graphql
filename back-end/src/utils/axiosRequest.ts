import axios from 'axios'

const url = "http://localhost:4000/graphql";

interface IAxiosGraphql {
  query: string
  token?: string
}

export const AxiosGraphql = async ({query, token = '',}: IAxiosGraphql)  => {
  const result = await axios({
    url,
    method: 'post',
    data: {
      query
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }, 
  })

  return result
}
