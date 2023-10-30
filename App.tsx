import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { LanguageProvider } from "./app/providers/language/LanguageProvider"
import { ContactList } from "./app/screens/ContactList"
import {
  connectToDatabase,
  createTables,
  getContacts,
} from "./app/db/dbService"
import { Contact } from "./app/components/ContactSummary/ContactSummary.typing"
import { AddContact } from "./app/screens/AddContact"
import { ColorProvider } from "./app/providers/color/ColorProvider"

export type CurrentScreen = "ContactList" | "AddContact"

function App(): JSX.Element {
  const [currentScreen, setCurrentScreen] =
    useState<CurrentScreen>("ContactList")
  const [contacts, setContacts] = useState<Contact[]>([])

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
    <SafeAreaView>
      <LanguageProvider>
        <ColorProvider>
          <View style={styles.screenContainer}>
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
})

export default App
