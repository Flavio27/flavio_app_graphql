const min = 100000
const max = 999999

export const randomCode = () => {
  return Math.floor(Math.random() * (max - min) + min)
}