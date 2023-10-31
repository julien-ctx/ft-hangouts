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
import { CurrentScreen } from "../../App"
import { connectToDatabase, removeContact } from "../db/dbService"
import plusButton from "../../assets/plusButton.png"
import { ContactDetails } from "../components/ContactDetails/ContactDetails"
import { FooterNavigation } from "../components/FooterNavigation/FooterNavigation"
import backButton from "../../assets/backButton.png"
import trash from "../../assets/trash.png"

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

  const [showContactDetails, setShowContactDetails] = useState<null | Contact>(
    null
  )

  const handleRemoveContact = async (contact: Contact) => {
    const db = await connectToDatabase()
    removeContact(db, contact)
    const newContactArray = contacts.filter(
      (currentContact) => currentContact !== contact
    )
    setContacts(newContactArray)
  }

  const handleRemoveContactAndGoBack = () => {
    if (showContactDetails) {
      Alert.alert(
        locale.confirmationAlert.title,
        locale.confirmationAlert.subtitle,
        [
          {
            text: locale.confirmationAlert.confirm,
            onPress: async () => {
              await handleRemoveContact(showContactDetails)
              setShowContactDetails(null)
            },
          },
          {
            text: locale.confirmationAlert.cancel,
            style: "cancel",
          },
        ]
      )
    }
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
                      onPress={() => handleRemoveContact(item)}
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
            firstOnPress={() => setCurrentScreen("AddContact")}
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
              handleRemoveContactAndGoBack()
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
  },
})
