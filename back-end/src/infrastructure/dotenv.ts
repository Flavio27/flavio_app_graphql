import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  const path = process.env.NODE_ENV === 'ci' ? '.env.test' : '.env'
  console.log(`Loading ${path} file from directory`)
  const result = dotenv.config({ path })
  if (result.error) { throw result.error }
}
