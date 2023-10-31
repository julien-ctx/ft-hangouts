import React from "react"
import { StyleSheet, View } from "react-native"
import { Pressable } from "../Pressable/Pressable"
import { colors } from "../../utils/theme/colors"
import { spacing } from "../../utils/theme/spacing"
import { Icon } from "../Icon/Icon"

interface Props {
  firstIcon: object
  firstOnPress: () => void
  secondIcon?: object | undefined
  secondOnPress?: () => void | undefined
  firstIconPosition?: "flex-end" | "flex-start" | undefined
}

export const FooterNavigation = ({
  firstIcon,
  firstOnPress,
  secondIcon,
  secondOnPress,
  firstIconPosition,
}: Props) => {
  return (
    <>
      {secondIcon && secondOnPress && (
        <View style={[styles.actionView, styles.severalIconStyle]}>
          <Pressable onPress={firstOnPress}>
            <Icon icon={firstIcon} size={24} />
          </Pressable>
          <Pressable onPress={secondOnPress}>
            <Icon icon={secondIcon} size={24} />
          </Pressable>
        </View>
      )}
      {!secondIcon && !secondOnPress && (
        <View
          style={[styles.actionView, { justifyContent: firstIconPosition }]}
        >
          <Pressable onPress={firstOnPress}>
            <Icon icon={firstIcon} size={24} />
          </Pressable>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  actionView: {
    backgroundColor: colors.palette.grey200,
    flexDirection: "row",
    paddingVertical: spacing.sm,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: spacing.md,
  },
  severalIconStyle: {
    justifyContent: "space-between",
  },
})
