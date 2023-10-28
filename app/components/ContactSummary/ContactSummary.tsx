import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../../utils/theme/colors"
import { Contact } from "./ContactSummary.typing"
import React from "react"
import { spacing } from "../../utils/theme/spacing"
import { Pressable } from "../Pressable/Pressable"

interface Props {
  contact: Contact
  onPress: () => void
}

export const ContactSummary = ({ contact, onPress }: Props) => {
  console.log(contact)
  return (
    <View style={styles.container}>
      <View style={styles.contactView}>
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
      <Pressable onPress={onPress}>
        <Image
          source={require("../../../assets/trash.png")}
          style={styles.trash}
        />
      </Pressable>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: colors.palette.grey400,
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginRight: 10,
  },
  information: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  phoneNumber: {
    fontStyle: "italic",
    fontSize: 10,
    color: colors.palette.grey600,
  },
  trash: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  contactView: {
    flexDirection: "row",
  },
})
