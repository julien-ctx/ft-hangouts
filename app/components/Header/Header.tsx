import React, { useContext, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { LanguageContext } from "../../providers/language/LanguageContext"

import { colors } from "../../utils/theme/colors"
import { spacing } from "../../utils/theme/spacing"
import { ColorSelectionButton } from "./ColorSelectionButton"
import { LanguageSelectionIcon } from "./LanguageSelectionIcon"
import { Pressable } from "../Pressable/Pressable"
import { ColorContext } from "../../providers/color/ColorContext"
import {
  connectToDatabase,
  updateSingleUserPreference,
} from "../../db/dbService"
import { Language } from "../../providers/language/Language.typing"

interface Props {
  title: string
}

export const Header = ({ title }: Props) => {
  const { language, setLanguage } = useContext(LanguageContext)
  const { color, setColor } = useContext(ColorContext)

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const handleColorSelection = async (newColor: string) => {
    const db = await connectToDatabase()
    await updateSingleUserPreference(db, "colorPreference", newColor)
    setColor(newColor)
  }

  const handleLanguageChange = async (newLanguage: Language) => {
    const db = await connectToDatabase()
    await updateSingleUserPreference(db, "languagePreference", newLanguage)
    setLanguage(newLanguage)
  }

  return (
    <View style={styles.headerView}>
      <View
        style={[
          isExpanded
            ? styles.backgroundViewExpanded
            : styles.backgroundViewNotExpanded,
          { backgroundColor: color },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.languageButtons}>
            <LanguageSelectionIcon
              icon="en"
              onPress={() => handleLanguageChange("en")}
              highlightIcon={language === "en"}
            />
            <LanguageSelectionIcon
              icon="fr"
              onPress={() => handleLanguageChange("fr")}
              highlightIcon={language === "fr"}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.title}>{title}</Text>
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
            { backgroundColor: color },
          ]}
        >
          <ColorSelectionButton
            color={colors.primary}
            highlightIcon={color === colors.primary}
            onPress={() => handleColorSelection(colors.primary)}
          />
          <ColorSelectionButton
            color={colors.palette.orange}
            highlightIcon={color === colors.palette.orange}
            onPress={() => handleColorSelection(colors.palette.orange)}
          />
          <ColorSelectionButton
            color={colors.palette.red}
            highlightIcon={color === colors.palette.red}
            onPress={() => {
              handleColorSelection(colors.palette.red)
            }}
          />
          <ColorSelectionButton
            color={colors.palette.green}
            highlightIcon={color === colors.palette.green}
            onPress={() => handleColorSelection(colors.palette.green)}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  languageButtons: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.sm,
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
    height: 34,
    width: 34,
  },
  colorSelectionView: {
    justifyContent: "space-between",
  },
  headerView: {
    marginBottom: spacing.sm,
  },
})
