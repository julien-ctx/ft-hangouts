import React, { useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import { LanguageContext } from "../providers/language/LanguageContext"
import en from "../locales/en"
import fr from "../locales/fr"
import { colors } from "../utils/theme/colors"
import { spacing } from "../utils/theme/spacing"

export const PermissionError = () => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{locale.permissionError.title}</Text>
      <Text style={styles.subtitle}>{locale.permissionError.subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  title: {
    color: colors.palette.black,
    fontSize: 20,
    textAlign: "center",
  },
  subtitle: {
    color: colors.palette.grey700,
    fontSize: 16,
    textAlign: "center",
  },
})
