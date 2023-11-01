import React, { useContext } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { addContact, connectToDatabase } from "../db/dbService"
import { CurrentScreen } from "../../App"
import { LanguageContext } from "../providers/language/LanguageContext"
import en from "../locales/en"
import fr from "../locales/fr"
import plus from "../../assets/plus.png"
import { Header } from "../components/Header/Header"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import backButton from "../../assets/backButton.png"
import { FooterNavigation } from "../components/FooterNavigation/FooterNavigation"
import { ContactFields } from "../components/ContactFields/ContactFields"
import { checkAllFields } from "../utils/format/form"

interface Props {
  setCurrentScreen: (currentScreen: CurrentScreen) => void
  contacts: Contact[]
  setContacts: (contacts: Contact[]) => void
}

export const AddContact = ({
  setCurrentScreen,
  contacts,
  setContacts,
}: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const handleAddContact = async (contact: Contact) => {
    const areFieldsCorrect = checkAllFields(
      contact.firstName,
      contact.name,
      contact.phoneNumber,
      contact.email
    )
    if (areFieldsCorrect) {
      const db = await connectToDatabase()
      addContact(db, contact)
      setContacts([...contacts, contact])
      setCurrentScreen("ContactList")
    } else if (
      contacts.find((item) => item.phoneNumber === contact.phoneNumber)
    ) {
      Alert.alert(
        locale.addContact.alreadyExistingContactAlert.title,
        locale.addContact.alreadyExistingContactAlert.subtitle
      )
    } else {
      Alert.alert(
        locale.addContact.wrongFieldsAlert.title,
        locale.addContact.wrongFieldsAlert.subtitle
      )
    }
  }

  return (
    <>
      <Header title={locale.contactList.addContact} />
      <View style={styles.screenContainer}>
        <ContactFields
          onPress={handleAddContact}
          buttonIcon={plus}
          buttonText={locale.addContact.submitButtonTitle}
        />
      </View>
      <FooterNavigation
        firstOnPress={() => setCurrentScreen("ContactList")}
        firstIcon={backButton}
        firstIconPosition="flex-start"
      />
    </>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
})