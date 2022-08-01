import dayjs from "dayjs"

export const tokenExpirationTime = "15m"
export const refreshTokenExpirationTime = dayjs().add(3, 'days').unix()
export const confirmEmailCodeExpirationTime = dayjs().add(10, 'minute').unix()

