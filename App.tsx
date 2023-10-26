/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { Header } from "./app/components/Header"
import { LanguageProvider } from "./app/providers/language/LanguageProvider"

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <LanguageProvider>
        <View>
          <Header />
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
