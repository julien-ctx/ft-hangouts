import { isValidEmail, isValidPhoneNumber } from "./regex"

export const checkAllFields = (
  firstName: string,
  name: string,
  nickname: string,
  phoneNumber: string,
  email: string
) => {
  return (
    firstName.length &&
    name.length &&
    nickname.length &&
    phoneNumber.length &&
    email.length &&
    isValidPhoneNumber(phoneNumber) &&
    isValidEmail(email)
  )
}
