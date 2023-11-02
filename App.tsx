import React, { useCallback, useEffect, useState } from "react"
import { AppState, SafeAreaView, StyleSheet, View } from "react-native"
import { LanguageProvider } from "./app/providers/language/LanguageProvider"
import { ContactList } from "./app/screens/ContactList"
import {
  connectToDatabase,
  createTables,
  getContacts,
  getSingleUserPreference,
  updateSingleUserPreference,
} from "./app/db/dbService"
import { Contact } from "./app/components/ContactSummary/ContactSummary.typing"
import { AddContact } from "./app/screens/AddContact"
import { ColorProvider } from "./app/providers/color/ColorProvider"
import { formatDateString } from "./app/utils/format/date"
import { LastUsage } from "./app/screens/LastUsage"
import { colors } from "./app/utils/theme/colors"

export type CurrentScreen = "ContactList" | "AddContact"

function App(): JSX.Element {
  const [currentScreen, setCurrentScreen] =
    useState<CurrentScreen>("ContactList")
  const [contacts, setContacts] = useState<Contact[]>([])

  const [lastUsageDate, setLastUsageDate] = useState<string>("")

  const handleLastUsageDate = async () => {
    const db = await connectToDatabase()
    const databaseLastUsageDate = await getSingleUserPreference(
      db,
      "lastUsageDate"
    )
    if (databaseLastUsageDate) {
      setLastUsageDate(databaseLastUsageDate)
      const timer = setTimeout(() => {
        setLastUsageDate("")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }

  useEffect(() => {
    handleLastUsageDate()
    const appStateListener = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        const db = await connectToDatabase()
        if (nextAppState === "background") {
          const stringDate = formatDateString(new Date())
          await updateSingleUserPreference(db, "lastUsageDate", stringDate)
          setLastUsageDate(stringDate)
        } else if (nextAppState === "active") {
          const timer = setTimeout(() => {
            setLastUsageDate("")
          }, 2000)
          return () => clearTimeout(timer)
        }
      }
    )
    return () => {
      appStateListener?.remove()
    }
  }, [])

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await connectToDatabase()

      await createTables(db)
      const databaseContacts = await getContacts(db)
      if (databaseContacts.length) {
        setContacts(databaseContacts)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadDataCallback()
  }, [loadDataCallback])

  return (
    <SafeAreaView style={styles.appBackground}>
      <LanguageProvider>
        <ColorProvider>
          <View style={styles.screenContainer}>
            {!lastUsageDate && (
              <>
                {currentScreen === "ContactList" && (
                  <ContactList
                    contacts={contacts}
                    setContacts={setContacts}
                    setCurrentScreen={setCurrentScreen}
                  />
                )}
                {currentScreen === "AddContact" && (
                  <AddContact
                    setCurrentScreen={setCurrentScreen}
                    contacts={contacts}
                    setContacts={setContacts}
                  />
                )}
              </>
            )}
            {lastUsageDate && <LastUsage date={lastUsageDate} />}
          </View>
        </ColorProvider>
      </LanguageProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    width: "100%",
  },
  appBackground: {
    backgroundColor: colors.palette.white,
  },
})

export default App
