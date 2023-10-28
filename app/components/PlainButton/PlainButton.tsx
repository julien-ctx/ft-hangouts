import React from "react"
import { Image, Pressable, StyleSheet, Text } from "react-native"
import { spacing } from "../../utils/theme/spacing"
import { colors } from "../../utils/theme/colors"

interface Props {
  text: string
  color: string
  image: object
  onPress: () => void
}

export const PlainButton = ({ text, color, image, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[{ backgroundColor: color }, styles.buttonView]}
    >
      <Text style={styles.textStyle}>{text}</Text>
      <Image source={image} style={styles.imageView} />
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
    fontSize: 16,
  },
  imageView: {
    height: 10,
    width: 10,
  },
})
