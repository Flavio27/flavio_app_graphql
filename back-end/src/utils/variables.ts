import dayjs from "dayjs"

export const tokenExpirationTime = "15m"
export const refreshTokenExpirationTime = dayjs().add(3, 'days').unix()

