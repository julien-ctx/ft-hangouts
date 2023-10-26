import { createContext } from "react"
import { Language } from "./Language.typing"

interface Props {
  language: Language
  setLanguage: (language: Language) => void
}

const defaultLanguageContextValue: Props = {
  language: "en",
  setLanguage: () => {},
}

export const LanguageContext = createContext<Props>(defaultLanguageContextValue)
