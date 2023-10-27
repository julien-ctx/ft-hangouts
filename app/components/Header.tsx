import React, { useContext } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { Language } from "../providers/language/Language.typing"
import { LanguageContext } from "../providers/language/LanguageContext"
import en from "../locales/en"
import fr from "../locales/fr"
import { colors } from "../utils/theme/colors"

export const Header = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const handleLanguageIconPress = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return (
    <View style={styles.backgroundView}>
      <View style={styles.container}>
        <View style={styles.languageButtons}>
          <Pressable onPress={() => handleLanguageIconPress("en")}>
            <Image
              source={require("../../assets/usa.png")}
              style={[
                styles.buttonContainer,
                language === "en" && styles.highlightIcon,
              ]}
            />
          </Pressable>
          <Pressable onPress={() => handleLanguageIconPress("fr")}>
            <Image
              source={require("../../assets/france.png")}
              style={[
                styles.buttonContainer,
                language === "fr" && styles.highlightIcon,
              ]}
            />
          </Pressable>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{locale.contactList.title}</Text>
        </View>
        <View style={styles.colorButton}>
          <Pressable onPress={() => {}}>
            <Image
              source={require("../../assets/hamburger-menu.png")}
              style={styles.buttonContainer}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
  },
  backgroundView: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  languageButtons: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  titleView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  colorButton: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttonContainer: {
    height: 22,
    width: 22,
  },
  highlightIcon: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 11,
  },
})
