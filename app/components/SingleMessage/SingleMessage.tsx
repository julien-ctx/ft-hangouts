import React, { useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Message } from "./SingleMessage.typing"
import { colors } from "../../utils/theme/colors"
import { ColorContext } from "../../providers/color/ColorContext"
import { spacing } from "../../utils/theme/spacing"

interface Props {
  message: Message
}

export const SingleMessage = ({ message }: Props) => {
  const { color } = useContext(ColorContext)

  const itemsAlignment = message.isReceived ? "flex-start" : "flex-end"
  const backgroundColor = message.isReceived ? colors.palette.grey300 : color
  const textColor = message.isReceived
    ? colors.palette.black
    : colors.palette.white
  return (
    <View
      style={[
        { alignSelf: itemsAlignment, backgroundColor: backgroundColor },
        styles.messageView,
      ]}
    >
      <Text style={[styles.messageText, { color: textColor }]}>
        {message.content}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageView: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    maxWidth: "85%",
  },
  messageText: {
    color: colors.palette.black,
    fontSize: 16,
  },
})
