import React, { useContext, useState } from "react"
import { Header } from "../components/Header/Header"
import { ContactSummary } from "../components/ContactSummary/ContactSummary"
import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { spacing } from "../utils/theme/spacing"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import { Pressable } from "../components/Pressable/Pressable"
import en from "../locales/en"
import fr from "../locales/fr"
import { LanguageContext } from "../providers/language/LanguageContext"
import { ScreenProps } from "../../App"
import { connectToDatabase, removeContact } from "../db/dbService"
import plusButton from "../../assets/plusButton.png"
import { ContactDetails } from "../components/ContactDetails/ContactDetails"
import { FooterNavigation } from "../components/FooterNavigation/FooterNavigation"
import backButton from "../../assets/backButton.png"
import trash from "../../assets/trash.png"
import { colors } from "../utils/theme/colors"

interface Props {
  contacts: Contact[]
  setContacts: (contacts: Contact[]) => void
  setScreenData: (screenData: ScreenProps) => void
}

export const ContactList = ({
  contacts,
  setContacts,
  setScreenData,
}: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const [showContactDetails, setShowContactDetails] = useState<null | Contact>(
    null
  )

  const handleRemoveContact = (
    contactToDelete: Contact,
    deleteFromDetails: boolean
  ) => {
    if (contactToDelete) {
      Alert.alert(
        locale.confirmationAlert.title,
        locale.confirmationAlert.subtitle,
        [
          {
            text: locale.confirmationAlert.cancel,
            style: "cancel",
          },
          {
            text: locale.confirmationAlert.confirm,
            onPress: async () => {
              const db = await connectToDatabase()
              removeContact(db, contactToDelete)
              const newContactArray = contacts.filter(
                (currentContact) => currentContact !== contactToDelete
              )
              setContacts(newContactArray)
              if (deleteFromDetails) {
                setShowContactDetails(null)
              }
            },
          },
        ]
      )
    }
  }

  const handleSendMessage = (item: Contact) => {
    setScreenData({ currentScreen: "MessageContact", data: item })
  }

  return (
    <>
      {!showContactDetails && (
        <>
          <Header title={locale.contactList.allContacts} />
          <View style={styles.screenContainer}>
            {contacts.length ? (
              <FlatList
                style={styles.container}
                data={contacts}
                keyExtractor={(item) => item.phoneNumber}
                renderItem={({ item }) => (
                  <Pressable onPress={() => setShowContactDetails(item)}>
                    <ContactSummary
                      contact={item}
                      onPressDelete={() => handleRemoveContact(item, false)}
                      onPressSendMessage={() => handleSendMessage(item)}
                    />
                  </Pressable>
                )}
                contentContainerStyle={styles.contentContainer}
              />
            ) : (
              <Text style={styles.emptyContactListMessage}>
                {locale.emptyContactListMessage}
              </Text>
            )}
          </View>
          <FooterNavigation
            firstIcon={plusButton}
            firstOnPress={() => setScreenData({ currentScreen: "AddContact" })}
            firstIconPosition="flex-end"
          />
        </>
      )}
      {showContactDetails && (
        <>
          <Header title={locale.contactDetails.edit} />
          <ContactDetails
            contact={showContactDetails}
            setShowContactDetails={setShowContactDetails}
            contacts={contacts}
            setContacts={setContacts}
          />
          <FooterNavigation
            firstIcon={backButton}
            firstOnPress={() => setShowContactDetails(null)}
            secondIcon={trash}
            secondOnPress={() => {
              handleRemoveContact(showContactDetails, true)
            }}
          />
        </>
      )}
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
  emptyContactListMessage: {
    textAlign: "center",
    fontSize: 16,
    color: colors.palette.black,
  },
})
