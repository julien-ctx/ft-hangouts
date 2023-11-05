import { useContext, useState } from "react"
import { LanguageContext } from "../../providers/language/LanguageContext"
import { Contact } from "../ContactSummary/ContactSummary.typing"
import en from "../../locales/en"
import fr from "../../locales/fr"
import React from "react"
import { TextInput } from "../TextInput/TextInput"
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { spacing } from "../../utils/theme/spacing"
import { PlainButton } from "../PlainButton/PlainButton"

interface Props {
  onPress: (contact: Contact) => void
  buttonText: string
  buttonIcon?: object | undefined
  initialContact?: Contact
  contacts: Contact[]
}

export const ContactFields = ({
  onPress,
  buttonText,
  buttonIcon,
  initialContact = { firstName: "", name: "", phoneNumber: "", email: "" },
  contacts,
}: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const [firstName, setFirstName] = useState(initialContact.firstName)
  const [name, setName] = useState(initialContact.name)
  const [phoneNumber, setPhoneNumber] = useState(initialContact.phoneNumber)
  const [email, setEmail] = useState(initialContact.email)

  const handleSaveFields = () => {
    if (
      initialContact.firstName &&
      initialContact.name &&
      initialContact.phoneNumber &&
      initialContact.email &&
      !contacts.find(
        (item) =>
          item.phoneNumber === phoneNumber &&
          initialContact.phoneNumber !== phoneNumber
      )
    ) {
      onPress({ firstName, name, phoneNumber, email })
    } else if (
      !initialContact.firstName &&
      !initialContact.name &&
      !initialContact.phoneNumber &&
      !initialContact.email
    ) {
      onPress({ firstName, name, phoneNumber, email })
    } else {
      Alert.alert(
        locale.addContact.alreadyExistingContactAlert.title,
        locale.addContact.alreadyExistingContactAlert.subtitle
      )
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? spacing.md : 0}
        >
          <View style={styles.container}>
            <Image
              source={require("../../../assets/user.png")}
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
            <View style={styles.marginView}>
              <PlainButton
                onPress={() => handleSaveFields()}
                text={buttonText}
                icon={buttonIcon}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    flexDirection: "column",
    gap: spacing.sm,
    flex: 1,
  },
  userIcon: {
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  marginView: {
    marginVertical: spacing.sm,
  },
  wrapper: {
    flex: 1,
  },
})
