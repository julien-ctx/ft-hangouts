import { useContext } from "react"
import { Image } from "react-native"
import { ColorContext } from "../../providers/color/ColorContext"
import React from "react"

interface Props {
  size: number
  icon: object
}

export const Icon = ({ size, icon }: Props) => {
  const { color } = useContext(ColorContext)
  return (
    <Image
      source={icon}
      style={{ height: size, width: size }}
      tintColor={color}
    />
  )
}
