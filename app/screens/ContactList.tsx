import React, { useContext } from "react"
import { Header } from "../components/Header/Header"
import { ContactSummary } from "../components/ContactSummary/ContactSummary"
import { StyleSheet, Text, View } from "react-native"
import { spacing } from "../utils/theme/spacing"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import { Pressable } from "../components/Pressable/Pressable"
import en from "../locales/en"
import fr from "../locales/fr"
import { LanguageContext } from "../providers/language/LanguageContext"
import { CurrentScreen } from "../../App"

interface Props {
  contacts: Contact[]
  setCurrentScreen: (currentScreen: CurrentScreen) => void
}

export const ContactList = ({ contacts, setCurrentScreen }: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const handleRemoveContact = () => {
    console.log("ContactDeletion")
  }

  return (
    <>
      <Header title={locale.contactList.allContacts} />
      <View style={styles.container}>
        {contacts.map((contact, index) => {
          return (
            <View key={index}>
              <ContactSummary
                contact={contact}
                onPress={() => handleRemoveContact()}
              />
            </View>
          )
        })}
      </View>
      <Pressable onPress={() => setCurrentScreen("AddContact")}>
        <Text>Add</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    flexDirection: "column",
    gap: spacing.sm,
  },
})
