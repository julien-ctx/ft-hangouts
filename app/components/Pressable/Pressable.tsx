import { Pressable as RNPressable, ViewStyle } from "react-native"
import React, { ComponentPropsWithoutRef } from "react"
import { PressableStateCallbackType } from "react-native/Libraries/Components/Pressable/Pressable"
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet"

interface Props extends ComponentPropsWithoutRef<typeof RNPressable> {
  onPress: () => void
}

export const Pressable = ({ children, style, onPress, ...rest }: Props) => {
  const pressStyle: (
    state: PressableStateCallbackType
  ) => StyleProp<ViewStyle> = ({ pressed }) => [
    { opacity: pressed ? 0.75 : 1 },
    style && (style as ViewStyle),
  ]

  return (
    <RNPressable style={pressStyle} onPress={onPress} {...rest}>
      {children}
    </RNPressable>
  )
}
