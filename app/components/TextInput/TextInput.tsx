import React from "react"
import { TextInput as RNTextInput, StyleSheet } from "react-native"
import { colors } from "../../utils/theme/colors"
import { spacing } from "../../utils/theme/spacing"

interface Props {
  placeholder?: string | undefined
  value: string
  setNewValue: (newValue: string) => void
}

export const TextInput = ({ placeholder, value, setNewValue }: Props) => {
  return (
    <RNTextInput
      style={styles.input}
      value={value}
      onChangeText={(newValue) => setNewValue(newValue)}
      placeholder={placeholder}
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
  },
})
