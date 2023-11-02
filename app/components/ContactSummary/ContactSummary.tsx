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
  const names = `${contact.firstName} ${contact.name}`
  return (
    <View style={styles.container}>
      <View style={styles.contactView}>
        <View style={styles.iconButton}>
          <Text style={styles.names}>{contact.firstName[0].toUpperCase()}</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.names}>
            {names.slice(0, 18)}
            {names.length > 18 && "..."}
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
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: colors.palette.grey400,
    height: 38,
    width: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    marginRight: 10,
  },
  information: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  phoneNumber: {
    fontStyle: "italic",
    fontSize: 14,
    color: colors.palette.grey600,
  },
  trash: {
    height: 38,
    width: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  contactView: {
    flexDirection: "row",
    alignItems: "center",
  },
  names: {
    fontSize: 16,
    color: colors.palette.black,
  },
})
