import React from "react"
import { Text, View } from "react-native"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"

interface Props {
  contact: Contact
}

export const MessageContact = ({ contact }: Props) => {
  return (
    <View>
      <Text>{contact.firstName}</Text>
    </View>
  )
}
