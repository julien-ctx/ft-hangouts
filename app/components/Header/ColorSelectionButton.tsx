import { StyleSheet } from "react-native"
import React from "react"
import { Pressable } from "../Pressable/Pressable"

interface Props {
  color: string
  highlightIcon: boolean
  onPress: () => void
}

export const ColorSelectionButton = ({
  color,
  highlightIcon = false,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        highlightIcon && styles.highlightIcon,
        { backgroundColor: color },
      ]}
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  highlightIcon: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 17,
  },
})
