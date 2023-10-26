import React, { useContext } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Language } from "../providers/language/Language.typing"
import { LanguageContext } from "../providers/language/LanguageContext"
import en from "../locales/en"
import fr from "../locales/fr"

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
            <Text>En</Text>
          </Pressable>
          <Pressable onPress={() => handleLanguageIconPress("fr")}>
            <Text>Fr</Text>
          </Pressable>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{locale.contactList.title}</Text>
        </View>
        <View style={styles.colorButton}>
          <Pressable onPress={() => {}}>
            <Text>Color</Text>
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
    backgroundColor: "#3872e8",
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
})
