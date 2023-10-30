import React, { useContext } from "react"
import { useState } from "react"
import { Alert, Image, StyleSheet, View } from "react-native"
import { addContact, connectToDatabase } from "../db/dbService"
import { CurrentScreen } from "../../App"
import { LanguageContext } from "../providers/language/LanguageContext"
import en from "../locales/en"
import fr from "../locales/fr"
import { TextInput } from "../components/TextInput/TextInput"
import { Pressable } from "../components/Pressable/Pressable"
import { PlainButton } from "../components/PlainButton/PlainButton"
import { colors } from "../utils/theme/colors"
import plus from "../../assets/plus.png"
import { spacing } from "../utils/theme/spacing"
import { Header } from "../components/Header/Header"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import { isValidEmail, isValidPhoneNumber } from "../utils/format/regex"
import { Icon } from "../components/Icon/Icon"
import backButton from "../../assets/backButton.png"

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

  const [firstName, setFirstName] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")

  const checkAllFields = () => {
    return (
      firstName.length &&
      name.length &&
      phoneNumber.length &&
      email.length &&
      isValidPhoneNumber(phoneNumber) &&
      isValidEmail(email)
    )
  }

  const handleAddContact = async () => {
    const areFieldsCorrect = checkAllFields()
    if (areFieldsCorrect) {
      const db = await connectToDatabase()
      const newContact = { firstName, name, phoneNumber, email }
      addContact(db, newContact)
      setContacts([...contacts, newContact])
      setCurrentScreen("ContactList")
    } else if (
      contacts.find((contact) => contact.phoneNumber === phoneNumber)
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
              text={locale.addContact.submitButtonTitle}
              image={plus}
            />
          </View>
        </View>
      </View>
      <View style={[styles.actionView, styles.container]}>
        <Pressable onPress={() => setCurrentScreen("ContactList")}>
          <Icon icon={backButton} size={30} />
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    flexDirection: "column",
    gap: spacing.sm,
  },
  screenContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
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
  actionView: {
    justifyContent: "flex-end",
    backgroundColor: colors.palette.grey200,
    flexDirection: "row",
    paddingVertical: spacing.sm,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})
