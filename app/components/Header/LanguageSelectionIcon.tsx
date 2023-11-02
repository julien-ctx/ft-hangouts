import { Image, StyleSheet } from "react-native"
import React from "react"
import { Language } from "../../providers/language/Language.typing"
import { Pressable } from "../Pressable/Pressable"

interface Props {
  icon: Language
  onPress: () => void
  highlightIcon: boolean
}

export const LanguageSelectionIcon = ({
  icon,
  onPress,
  highlightIcon = false,
}: Props) => {
  let source
  switch (icon) {
    case "fr":
      source = require("../../../assets/france.png")
      break
    case "en":
      source = require("../../../assets/usa.png")
      break
  }
  return (
    <Pressable onPress={onPress}>
      <Image
        source={source}
        style={[styles.buttonContainer, highlightIcon && styles.highlightIcon]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 34,
    width: 34,
    borderRadius: 11,
  },
  highlightIcon: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 17,
  },
})
