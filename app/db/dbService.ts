import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"

enablePromise(true)

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "fthangouts.db", location: "default" },
    () => {},
    (error) => console.log(error)
  )
}

export const createTables = async (db: SQLiteDatabase) => {
  const userPreferencesQuery = `
	  CREATE TABLE IF NOT EXISTS UserPreferences (
      colorPreference TEXT,
      languagePreference TEXT
	  );
  `

  const contactsQuery = `
	  CREATE TABLE IF NOT EXISTS Contacts (
      contactId INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      name TEXT,
      phoneNumber TEXT,
      email TEXT
	  );
  `

  await db.executeSql(userPreferencesQuery)
  await db.executeSql(contactsQuery)
}

export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  try {
    const Contacts: Contact[] = []
    const results = await db.executeSql("SELECT * FROM Contacts")
    results.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        Contacts.push(result.rows.item(index))
      }
    })
    return Contacts
  } catch (error) {
    console.error(error)
    throw Error("Failed to get Contacts from database")
  }
}

export const addContact = async (db: SQLiteDatabase, contact: Contact) => {
  const insertQuery = `
	  INSERT INTO Contacts (firstName, name, phoneNumber, email)
	  VALUES (?, ?, ?, ?);
	`

  const values = [
    contact.firstName,
    contact.name,
    contact.phoneNumber,
    contact.email,
  ]

  return db.executeSql(insertQuery, values)
}

export const clearTable = async (db: SQLiteDatabase, tableName: string) => {
  try {
    const query = `DELETE FROM ${tableName};`
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to clear ${tableName} table`)
  }
}

export const removeTables = async (db: SQLiteDatabase) => {
  try {
    const contactsQuery = `DROP TABLE IF EXISTS Contacts;`
    const userPreferencesQuery = `DROP TABLE IF EXISTS UserPreferences;`
    await db.executeSql(contactsQuery)
    await db.executeSql(userPreferencesQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop tables`)
  }
}
