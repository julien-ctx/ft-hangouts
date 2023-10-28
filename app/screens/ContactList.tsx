import React, { useContext, useState } from "react"
import { Header } from "../components/Header/Header"
import { ContactSummary } from "../components/ContactSummary/ContactSummary"
import { Image, StyleSheet, Text, View } from "react-native"
import { spacing } from "../utils/theme/spacing"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import { Pressable } from "../components/Pressable/Pressable"
import en from "../locales/en"
import fr from "../locales/fr"
import { LanguageContext } from "../providers/language/LanguageContext"
import { TextInput } from "../components/TextInput/TextInput"
import { colors } from "../utils/theme/colors"
import plus from "../../assets/plus.png"
import { PlainButton } from "../components/PlainButton/PlainButton"
import { addContact, connectToDatabase, createTables } from "../db/dbService"

interface Props {
  contacts: Contact[]
}

export const ContactList = ({ contacts }: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const [addContactView, setAddContactView] = useState<boolean>(false)
  const [firstName, setFirstName] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")

  const handleRemoveContact = () => {
    console.log("ContactDeletion")
  }

  const handleAddContact = async () => {
    setAddContactView(true)
    const db = await connectToDatabase()
    await createTables(db)
    addContact(db, { firstName, name, phoneNumber, email })
    setAddContactView(false)
  }

  return (
    <>
      {!addContactView && (
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
          <Pressable onPress={() => setAddContactView(true)}>
            <Text>Add</Text>
          </Pressable>
        </>
      )}
      {addContactView && (
        <>
          <Header title={locale.contactList.addContact} />
          <View style={styles.container}>
            <Image
              source={require("../../assets/user.png")}
              style={styles.userIcon}
            />
            <TextInput
              placeholder={locale.addContact.inputPlaceholders.firstName}
              value={firstName}
              setNewValue={setFirstName}
            />
            <TextInput
              placeholder={locale.addContact.inputPlaceholders.name}
              value={name}
              setNewValue={setName}
            />
            <TextInput
              placeholder={locale.addContact.inputPlaceholders.phoneNumber}
              value={phoneNumber}
              setNewValue={setPhoneNumber}
            />
            <TextInput
              placeholder={locale.addContact.inputPlaceholders.email}
              value={email}
              setNewValue={setEmail}
            />
            <View style={styles.marginTopView}>
              <PlainButton
                onPress={handleAddContact}
                color={colors.primary}
                text={locale.addContact.submitButtonTitle}
                image={plus}
              />
            </View>
            <Pressable onPress={() => setAddContactView(false)}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    flexDirection: "column",
    gap: spacing.sm,
  },
  userIcon: {
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  marginTopView: {
    marginTop: spacing.sm,
  },
})
