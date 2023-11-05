import React from "react"
import { TextInput as RNTextInput, StyleSheet } from "react-native"
import { colors } from "../../utils/theme/colors"
import { spacing } from "../../utils/theme/spacing"

interface Props {
  placeholder?: string | undefined
  value: string
  setNewValue: (newValue: string) => void
  multiline?: boolean | undefined
  maxLength?: number | undefined
  autoCorrect?: boolean | undefined
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined
}

export const TextInput = ({
  placeholder,
  value,
  setNewValue,
  multiline,
  maxLength,
  autoCorrect,
  autoCapitalize,
}: Props) => {
  return (
    <RNTextInput
      style={styles.input}
      value={value}
      onChangeText={(newValue) => setNewValue(newValue)}
      placeholder={placeholder}
      placeholderTextColor={colors.palette.grey400}
      multiline={multiline}
      maxLength={maxLength}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.palette.grey400,
    backgroundColor: colors.palette.grey100,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs,
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
    color: colors.palette.black,
  },
})
