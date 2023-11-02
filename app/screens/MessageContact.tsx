import React, { useContext } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import { Header } from "../components/Header/Header"
import { FooterNavigation } from "../components/FooterNavigation/FooterNavigation"
import backButton from "../../assets/backButton.png"
import { spacing } from "../utils/theme/spacing"
import { TextInput } from "../components/TextInput/TextInput"
import { LanguageContext } from "../providers/language/LanguageContext"
import en from "../locales/en"
import fr from "../locales/fr"
import { PERMISSIONS, request } from "react-native-permissions"
import SmsAndroid from "react-native-get-sms-android"

interface Props {
  contact: Contact
  onBackPress: () => void
}

export const MessageContact = ({ contact, onBackPress }: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  let names = `${contact.firstName} ${contact.name}`
  if (names.length > 15) {
    names = names.slice(0, 15) + "..."
  }

  const handleSendMessage = async () => {
    console.log(PERMISSIONS.ANDROID.SEND_SMS)
    const status = await request(PERMISSIONS.ANDROID.SEND_SMS)
    if (status === "granted") {
      SmsAndroid.autoSend(
        "+33652744249",
        "Test ft_hangout",
        (fail: string) => {
          console.log("Failed with this error: " + fail)
        },
        () => {
          console.log("SMS sent successfully")
        }
      )
    } else {
      console.log("Permission to send SMS denied")
    }
  }

  return (
    <>
      <Header title={names} />
      <View style={[styles.container, styles.screenContainer]}>
        <Pressable onPress={handleSendMessage}>
          <Text>SEND MESSAGE</Text>
        </Pressable>
      </View>
      <View style={[styles.container, styles.messageBox]}>
        <TextInput placeholder={locale.message.placeholder} />
        <Image
          style={styles.button}
          source={require("../../assets/send.png")}
        />
      </View>
      <FooterNavigation firstIcon={backButton} firstOnPress={onBackPress} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  messageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  screenContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  button: {
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
  },
})
