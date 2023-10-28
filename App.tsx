/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

function App(): JSX.Element {
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
    <SafeAreaView style={styles.container}>
      <LanguageProvider>
        <View>
          <ContactList contacts={contacts} />
        </View>
      </LanguageProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
