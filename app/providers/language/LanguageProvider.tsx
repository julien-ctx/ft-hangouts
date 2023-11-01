import React, { useEffect, useState } from "react"
import { LanguageContext } from "./LanguageContext"
import { Language } from "./Language.typing"
import {
  connectToDatabase,
  createTables,
  getUserPreferences,
} from "../../db/dbService"
import { NativeModules, Platform } from "react-native"

interface Props {
  children: React.ReactNode
}

const getDatabaseLanguage = async (): Promise<Language> => {
  const frenchIdentifierList = [
    "fr_FR",
    "fr_CA",
    "fr_BE",
    "fr_CH",
    "fr_LU",
    "fr_MC",
    "fr_US",
  ]
  const db = await connectToDatabase()
  await createTables(db)
  const databaseUserPreferences = await getUserPreferences(db)
  if (databaseUserPreferences?.languagePreference) {
    return databaseUserPreferences.languagePreference
  } else {
    const locale =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier
    if (frenchIdentifierList.includes(locale)) {
      return "fr"
    }
    return "en"
  }
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
