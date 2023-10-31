import { isValidEmail, isValidPhoneNumber } from "./regex"

export const checkAllFields = (
  firstName: string,
  name: string,
  phoneNumber: string,
  email: string
) => {
  return (
    firstName.length &&
    name.length &&
    phoneNumber.length &&
    email.length &&
    isValidPhoneNumber(phoneNumber) &&
    isValidEmail(email)
  )
}
