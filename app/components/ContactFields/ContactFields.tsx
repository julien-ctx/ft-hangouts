import { useContext, useState } from "react"
import { LanguageContext } from "../../providers/language/LanguageContext"
import { Contact } from "../ContactSummary/ContactSummary.typing"
import en from "../../locales/en"
import fr from "../../locales/fr"
import React from "react"
import { TextInput } from "../TextInput/TextInput"
import { Image, StyleSheet, View } from "react-native"
import { spacing } from "../../utils/theme/spacing"
import { PlainButton } from "../PlainButton/PlainButton"

interface Props {
  onPress: (contact: Contact) => void
  buttonText: string
  buttonIcon?: object | undefined
  initialContact?: Contact
}

export const ContactFields = ({
  onPress,
  buttonText,
  buttonIcon,
  initialContact = { firstName: "", name: "", phoneNumber: "", email: "" },
}: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const [firstName, setFirstName] = useState(initialContact.firstName)
  const [name, setName] = useState(initialContact.name)
  const [phoneNumber, setPhoneNumber] = useState(initialContact.phoneNumber)
  const [email, setEmail] = useState(initialContact.email)

  return (
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
      <View style={styles.marginTopView}>
        <PlainButton
          onPress={() => onPress({ firstName, name, phoneNumber, email })}
          text={buttonText}
          icon={buttonIcon}
        />
      </View>
    </View>
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
