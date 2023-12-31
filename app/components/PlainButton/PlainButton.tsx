import React, { useContext } from "react"
import { Image, Pressable, StyleSheet, Text } from "react-native"
import { spacing } from "../../utils/theme/spacing"
import { colors } from "../../utils/theme/colors"
import { ColorContext } from "../../providers/color/ColorContext"

interface Props {
  text: string
  icon?: object | undefined
  onPress: () => void
}

export const PlainButton = ({ text, icon, onPress }: Props) => {
  const { color } = useContext(ColorContext)
  return (
    <Pressable
      onPress={onPress}
      style={[{ backgroundColor: color }, styles.buttonView]}
    >
      <Text style={styles.textStyle}>{text}</Text>
      {icon && <Image source={icon} style={styles.imageView} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  textStyle: {
    textAlign: "center",
    color: colors.palette.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  imageView: {
    height: 10,
    width: 10,
  },
})
