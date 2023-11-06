import { Alert, StyleSheet, View } from "react-native"
import { Contact } from "../ContactSummary/ContactSummary.typing"
import React, { useContext } from "react"
import { LanguageContext } from "../../providers/language/LanguageContext"
import en from "../../locales/en"
import fr from "../../locales/fr"
import { ContactFields } from "../ContactFields/ContactFields"
import { connectToDatabase, updateContact } from "../../db/dbService"
import { checkAllFields, haveSameFields } from "../../utils/format/form"

interface Props {
  contact: Contact
  setShowContactDetails: (value: Contact | null) => void
  contacts: Contact[]
  setContacts: (contacts: Contact[]) => void
}

export const ContactDetails = ({
  contact,
  setShowContactDetails,
  contacts,
  setContacts,
}: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const handleContactEdition = async (contactToEdit: Contact) => {
    const db = await connectToDatabase()
    if (
      !checkAllFields(
        contactToEdit.firstName,
        contactToEdit.name,
        contactToEdit.nickname,
        contactToEdit.phoneNumber,
        contactToEdit.email
      )
    ) {
      Alert.alert(
        locale.addContact.wrongFieldsAlert.title,
        locale.addContact.wrongFieldsAlert.subtitle
      )
    } else if (haveSameFields(contact, contactToEdit)) {
      setShowContactDetails(null)
    } else {
      await updateContact(db, contact.phoneNumber, contactToEdit)
      const newContactList = contacts.filter(
        (item) => item.phoneNumber !== contact.phoneNumber
      )
      setContacts([...newContactList, contactToEdit])
      setShowContactDetails(null)
    }
  }

  return (
    <View style={styles.screenContainer}>
      <ContactFields
        initialContact={contact}
        onPress={handleContactEdition}
        buttonText={locale.editContact.save}
        contacts={contacts}
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
