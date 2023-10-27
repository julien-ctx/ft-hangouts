/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { LanguageProvider } from "./app/providers/language/LanguageProvider"
import { ContactList } from "./app/screens/ContactList"

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <LanguageProvider>
        <View>
          <ContactList />
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
