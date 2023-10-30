import React, { useState } from "react"

import { colors } from "../../utils/theme/colors"
import { ColorContext } from "./ColorContext"

interface Props {
  children: React.ReactNode
}

export const ColorProvider = ({ children }: Props) => {
  const [color, setColor] = useState<string>(colors.primary)

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  )
}
