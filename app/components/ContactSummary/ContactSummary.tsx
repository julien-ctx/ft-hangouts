import { StyleSheet, Text, View } from "react-native"
import { colors } from "../../utils/theme/colors"
import { Contact } from "./ContactSummary.typing"
import React from "react"
import { spacing } from "../../utils/theme/spacing"

interface Props {
  contact: Contact
}

export const ContactSummary = ({ contact }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconButton}>
        <Text>{contact.firstName[0].toUpperCase()}</Text>
      </View>
      <View style={styles.information}>
        <Text>
          {contact.firstName} {contact.name}
        </Text>
        <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.grey200,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs,
    borderRadius: 10,
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: colors.palette.grey400,
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  information: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  phoneNumber: {
    fontStyle: "italic",
    fontSize: 10,
  },
})
