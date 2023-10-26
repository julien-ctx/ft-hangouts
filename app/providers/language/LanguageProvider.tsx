import React, { useState } from "react"
import { LanguageContext } from "./LanguageContext"
import { Language } from "./Language.typing"

interface Props {
  children: React.ReactNode
}

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<Language>("en")

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
