import { StyleSheet, View } from "react-native"
import { Contact } from "../ContactSummary/ContactSummary.typing"
import React, { useContext } from "react"
import { LanguageContext } from "../../providers/language/LanguageContext"
import en from "../../locales/en"
import fr from "../../locales/fr"
import { ContactFields } from "../ContactFields/ContactFields"

interface Props {
  contact: Contact
}

export const ContactDetails = ({ contact }: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const handleContactEdition = (contactToEdit: Contact) => {
    console.log(contactToEdit)
  }

  return (
    <View style={styles.screenContainer}>
      <ContactFields
        initialContact={contact}
        onPress={handleContactEdition}
        buttonText={locale.editContact.save}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
})
