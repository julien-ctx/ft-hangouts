import React, { useContext } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../utils/theme/colors"
import { LanguageContext } from "../providers/language/LanguageContext"
import en from "../locales/en"
import fr from "../locales/fr"

interface Props {
  date: string
}

export const LastUsage = ({ date }: Props) => {
  const { language } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  return (
    <View style={styles.lastUsageView}>
      <Image
        style={styles.fourtyTwoIcon}
        source={require("../../assets/42.png")}
      />
      <Text style={styles.bigTitle}>{locale.lastUsage.title}</Text>
      <Text style={styles.lastConnection}>
        {locale.lastUsage.subtitle} {date}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  bigTitle: {
    fontSize: 40,
    fontWeight: "600",
  },
  lastConnection: {
    fontSize: 14,
    color: colors.palette.grey600,
  },
  lastUsageView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  fourtyTwoIcon: {
    width: 72,
    height: 72,
  },
})
