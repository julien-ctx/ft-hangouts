import { Contact } from "../../components/ContactSummary/ContactSummary.typing"
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

export const haveSameFields = (
  firstContact: Contact,
  secondContact: Contact
) => {
  return (
    firstContact.firstName === secondContact.firstName &&
    firstContact.name === secondContact.name &&
    firstContact.nickname === secondContact.nickname &&
    firstContact.phoneNumber === secondContact.phoneNumber &&
    firstContact.email === secondContact.email
  )
}
