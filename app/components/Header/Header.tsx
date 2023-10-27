import React, { useContext, useState } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { LanguageContext } from "../../providers/language/LanguageContext"
import en from "../../locales/en"
import fr from "../../locales/fr"
import { colors } from "../../utils/theme/colors"
import { spacing } from "../../utils/theme/spacing"
import { ColorSelectionButton } from "./ColorSelectionButton"

export const Header = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const locale = language === "en" ? en : fr

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [headerColor, setHeaderColor] = useState<string>(colors.primary)

  return (
    <>
      <View
        style={[
          isExpanded
            ? styles.backgroundViewExpanded
            : styles.backgroundViewNotExpanded,
          { backgroundColor: headerColor },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.languageButtons}>
            <Pressable onPress={() => setLanguage("en")}>
              <Image
                source={require("../../../assets/usa.png")}
                style={[
                  styles.buttonContainer,
                  language === "en" && styles.highlightIcon,
                ]}
              />
            </Pressable>
            <Pressable onPress={() => setLanguage("fr")}>
              <Image
                source={require("../../../assets/france.png")}
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
            <Pressable onPress={() => setIsExpanded(!isExpanded)}>
              <Image
                source={require("../../../assets/hamburger-menu.png")}
                style={styles.buttonContainer}
              />
            </Pressable>
          </View>
        </View>
      </View>
      {isExpanded && (
        <View
          style={[
            styles.container,
            styles.backgroundViewNotExpanded,
            styles.colorSelectionView,
            { backgroundColor: headerColor },
          ]}
        >
          <ColorSelectionButton
            color={colors.primary}
            highlightIcon={headerColor === colors.primary}
            onPress={() => setHeaderColor(colors.primary)}
          />
          <ColorSelectionButton
            color={colors.palette.orange}
            highlightIcon={headerColor === colors.palette.orange}
            onPress={() => setHeaderColor(colors.palette.orange)}
          />
          <ColorSelectionButton
            color={colors.palette.red}
            highlightIcon={headerColor === colors.palette.red}
            onPress={() => setHeaderColor(colors.palette.red)}
          />
          <ColorSelectionButton
            color={colors.palette.green}
            highlightIcon={headerColor === colors.palette.green}
            onPress={() => setHeaderColor(colors.palette.green)}
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
    flexDirection: "row",
  },
  backgroundViewNotExpanded: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  backgroundViewExpanded: {
    borderBottomWidth: 2,
    borderBottomColor: colors.palette.white,
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
  colorSelectionView: {
    justifyContent: "space-between",
  },
})
