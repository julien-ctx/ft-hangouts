import { createContext } from "react"
import { colors } from "../../utils/theme/colors"

interface Props {
  color: string
  setColor: (color: string) => void
}

const defaultColorContextValue: Props = {
  color: colors.primary,
  setColor: () => {},
}

export const ColorContext = createContext<Props>(defaultColorContextValue)
