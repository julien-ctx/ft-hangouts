import { isValidEmail, isValidPhoneNumber } from "./regex"

export const checkAllFields = (
  firstName: string,
  name: string,
  phoneNumber: string,
  email: string
) => {
  console.log(phoneNumber)
  console.log(
    firstName.length,
    name.length,
    phoneNumber.length,
    email.length,
    isValidPhoneNumber(phoneNumber),
    isValidEmail(email)
  )
  return (
    firstName.length &&
    name.length &&
    phoneNumber.length &&
    email.length &&
    isValidPhoneNumber(phoneNumber) &&
    isValidEmail(email)
  )
}
