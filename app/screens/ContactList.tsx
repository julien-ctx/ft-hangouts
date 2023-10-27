import React from "react"
import { Header } from "../components/Header/Header"
import { ContactSummary } from "../components/ContactSummary/ContactSummary"
import { StyleSheet, View } from "react-native"
import { spacing } from "../utils/theme/spacing"

export const ContactList = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <ContactSummary
          contact={{
            firstName: "Julien",
            name: "Caucheteux",
            phoneNumber: "+33600000000",
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
})
