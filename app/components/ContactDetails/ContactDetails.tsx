import { Text, View } from "react-native"
import { Contact } from "../ContactSummary/ContactSummary.typing"
import React from "react"

interface Props {
  contact: Contact
}

export const ContactDetails = ({ contact }: Props) => {
  return (
    <View>
      <Text>{contact.email}</Text>
    </View>
  )
}
