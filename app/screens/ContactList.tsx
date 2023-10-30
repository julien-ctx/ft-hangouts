import React, { useContext } from "react"
import { Header } from "../components/Header/Header"
import { ContactSummary } from "../components/ContactSummary/ContactSummary"
import { FlatList, StyleSheet, View } from "react-native"
import { spacing } from "../utils/theme/spacing"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import { Pressable } from "../components/Pressable/Pressable"
import en from "../locales/en"
import fr from "../locales/fr"
import { LanguageContext } from "../providers/language/LanguageContext"
import { CurrentScreen } from "../../App"
import { connectToDatabase, removeContact } from "../db/dbService"
import { colors } from "../utils/theme/colors"
import { Icon } from "../components/Icon/Icon"
import plusButton from "../../assets/plusButton.png"

interface Props {
  contacts: Contact[]
  setContacts: (contacts: Contact[]) => void
  setCurrentScreen: (currentScreen: CurrentScreen) => void
}

export const ContactList = ({
  contacts,
  setContacts,
  setCurrentScreen,
}: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const handleRemoveContact = async (contact: Contact) => {
    const db = await connectToDatabase()
    removeContact(db, contact)
    const newContactArray = contacts.filter(
      (currentContact) => currentContact !== contact
    )
    setContacts(newContactArray)
  }

  return (
    <>
      <Header title={locale.contactList.allContacts} />
      <View style={styles.screenContainer}>
        <FlatList
          style={styles.container}
          data={contacts}
          keyExtractor={(item) => item.phoneNumber}
          renderItem={({ item }) => (
            <ContactSummary
              contact={item}
              onPress={() => handleRemoveContact(item)}
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
      <View style={[styles.actionView, styles.container]}>
        <Pressable onPress={() => setCurrentScreen("AddContact")}>
          <Icon icon={plusButton} size={30} />
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  screenContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    gap: spacing.sm,
  },
  actionView: {
    justifyContent: "flex-end",
    backgroundColor: colors.palette.grey200,
    flexDirection: "row",
    paddingVertical: spacing.sm,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})
