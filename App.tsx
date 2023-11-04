import React, { useCallback, useEffect, useState } from "react"
import { AppState, SafeAreaView, StyleSheet, View } from "react-native"
import { LanguageProvider } from "./app/providers/language/LanguageProvider"
import { ContactList } from "./app/screens/ContactList"
import {
  addMessage,
  connectToDatabase,
  createTables,
  getContacts,
  getSingleUserPreference,
  updateSingleUserPreference,
} from "./app/db/dbService"
import { Contact } from "./app/components/ContactSummary/ContactSummary.typing"
import { AddContact } from "./app/screens/AddContact"
import { ColorProvider } from "./app/providers/color/ColorProvider"
import {
  formatDateString,
  formatDateStringTimestamp,
} from "./app/utils/format/date"
import { LastUsage } from "./app/screens/LastUsage"
import { colors } from "./app/utils/theme/colors"
import { MessageContact } from "./app/screens/MessageContact"
import { PERMISSIONS, request } from "react-native-permissions"
import SmsListener from "react-native-android-sms-listener"
import SmsAndroid from "react-native-get-sms-android"

type CurrentScreen = "ContactList" | "AddContact" | "MessageContact"

export interface ScreenProps {
  currentScreen: CurrentScreen
  data?: Contact | undefined
}

function App(): JSX.Element {
  const [screenData, setScreenData] = useState<ScreenProps>({
    currentScreen: "ContactList",
  })
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
          const databaseLastUsageDate = await getSingleUserPreference(
            db,
            "lastUsageDate"
          )
          console.log(databaseLastUsageDate)
          let filter = {
            box: "inbox",
            minDate: formatDateStringTimestamp(databaseLastUsageDate),
            maxDate: Date.now(),
            maxCount: 10,
          }

          SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
              console.log("Failed with this error: " + fail)
            },
            (count, smsList) => {
              let arr = JSON.parse(smsList)
              arr
                .slice()
                .reverse()
                .forEach(async (item) => {
                  console.log("Received", item.body)
                  await addMessage(db, item.address, {
                    isReceived: true,
                    content: item.body,
                    timestamp: item.date,
                  })
                })
            }
          )

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

  const askForPermissions = async () => {
    await request(PERMISSIONS.ANDROID.READ_SMS)
    await request(PERMISSIONS.ANDROID.RECEIVE_SMS)
    await request(PERMISSIONS.ANDROID.SEND_SMS)
  }

  useEffect(() => {
    loadDataCallback()
    askForPermissions()
    const subscription = SmsListener.addListener(
      async (incomingMessage: any) => {
        if (incomingMessage.originatingAddress) {
          const newMessage = {
            content: incomingMessage.body,
            isReceived: true,
            timestamp: incomingMessage.timestamp,
          }
          const db = await connectToDatabase()
          await addMessage(db, incomingMessage.originatingAddress, newMessage)
        }
      }
    )
    return () => subscription?.remove()
  }, [loadDataCallback])

  return (
    <SafeAreaView style={styles.appBackground}>
      <LanguageProvider>
        <ColorProvider>
          <View style={styles.screenContainer}>
            {!lastUsageDate && (
              <>
                {screenData.currentScreen === "ContactList" && (
                  <ContactList
                    contacts={contacts}
                    setContacts={setContacts}
                    setScreenData={setScreenData}
                  />
                )}
                {screenData.currentScreen === "AddContact" && (
                  <AddContact
                    contacts={contacts}
                    setContacts={setContacts}
                    setScreenData={setScreenData}
                  />
                )}
                {screenData.currentScreen === "MessageContact" &&
                  screenData.data && (
                    <MessageContact
                      contact={screenData.data}
                      onBackPress={() =>
                        setScreenData({
                          currentScreen: "ContactList",
                          data: undefined,
                        })
                      }
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
