import React, { useEffect, useState } from "react"
import { LanguageContext } from "./LanguageContext"
import { Language } from "./Language.typing"
import { connectToDatabase, getUserPreferences } from "../../db/dbService"

interface Props {
  children: React.ReactNode
}

const getDatabaseLanguage = async (): Promise<Language> => {
  const db = await connectToDatabase()
  const databaseUserPreferences = await getUserPreferences(db)
  console.log(databaseUserPreferences)
  return databaseUserPreferences?.languagePreference ?? "en"
}

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const fetchLanguage = async () => {
      const fetchedLanguage = await getDatabaseLanguage()
      setLanguage(fetchedLanguage)
    }

    fetchLanguage()
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
