import React, { useContext, useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native"
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
import { Message } from "../components/SingleMessage/SingleMessage.typing"
import { SingleMessage } from "../components/SingleMessage/SingleMessage"

interface Props {
  contact: Contact
  onBackPress: () => void
}

export const MessageContact = ({ contact, onBackPress }: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const [message, setMessage] = useState<string>("")
  const [allMessages, setAllMessages] = useState<Message[]>([])

  useEffect(() => {
    setAllMessages([
      { isReceived: false, message: "Salut c'est moi" },
      {
        isReceived: true,
        message:
          "Salut c'est pas moi et je suis chiant car je prends beaucoup de place",
      },
      {
        isReceived: false,
        message:
          "Salut c'est pas moi et je suis chiant car je prends beaucoup de place",
      },
      {
        isReceived: true,
        message:
          "dewopfurefireoufgjrtiohgfiderohfrouefhirjfhouehfuerhfiurfheriuhfreuifhreuffheruhrefiuerhfiurehuier",
      },
      { isReceived: false, message: "Salut c'est moi" },
      {
        isReceived: true,
        message:
          "Salut c'est pas moi et je suis chiant car je prends beaucoup de place",
      },
      {
        isReceived: false,
        message:
          "Salut c'est pas moi et je suis chiant car je prends beaucoup de place",
      },
      {
        isReceived: true,
        message:
          "dewopfurefireoufgjrtiohgfiderohfrouefhirjfhouehfuerhfiurfheriuhfreuifhreuffheruhrefiuerhfiurehuier",
      },
      { isReceived: false, message: "Salut c'est moi" },
      {
        isReceived: true,
        message:
          "Salut c'est pas moi et je suis chiant car je prends beaucoup de place",
      },
      {
        isReceived: false,
        message:
          "Salut c'est pas moi et je suis chiant car je prends beaucoup de place",
      },
      {
        isReceived: true,
        message:
          "dewopfurefireoufgjrtiohgfiderohfrouefhirjfhouehfuerhfiurfheriuhfreuifhreuffheruhrefiuerhfiurehuier",
      },
    ])
  }, [])

  let names = `${contact.firstName} ${contact.name}`
  if (names.length > 15) {
    names = names.slice(0, 15) + "..."
  }

  const handleSendMessage = async () => {
    if (message.length) {
      const status = await request(PERMISSIONS.ANDROID.SEND_SMS)
      if (status === "granted") {
        SmsAndroid.autoSend(
          contact.phoneNumber,
          message,
          (fail: string) => {
            console.log("Failed with this error: " + fail)
            Alert.alert(
              locale.message.error.title,
              locale.message.error.subtitle
            )
          },
          () => {
            console.log("SMS sent successfully")
            setMessage("")
          }
        )
      } else {
        console.log("Permission to send SMS denied")
        Alert.alert(
          locale.message.permissionDenied.title,
          locale.message.permissionDenied.subtitle
        )
      }
    } else {
      Alert.alert(
        locale.message.emptyMessage.title,
        locale.message.emptyMessage.subtitle
      )
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? spacing.md : 0}
    >
      <Header title={names} />
      <View
        style={[styles.container, styles.screenContainer, styles.allMessages]}
      >
        <FlatList
          data={allMessages}
          renderItem={({ item }) => <SingleMessage message={item} />}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={[styles.container, styles.messageBox]}>
        <TextInput
          placeholder={locale.message.placeholder}
          value={message}
          setNewValue={setMessage}
          multiline
          maxLength={200}
        />
        <Pressable onPress={handleSendMessage}>
          <Image
            style={styles.button}
            source={require("../../assets/send.png")}
          />
        </Pressable>
      </View>
      <FooterNavigation firstIcon={backButton} firstOnPress={onBackPress} />
    </KeyboardAvoidingView>
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
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    gap: spacing.sm,
  },
  allMessages: {
    marginVertical: spacing.sm,
  },
})
