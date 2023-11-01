import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage"
import { Contact } from "../components/ContactSummary/ContactSummary.typing"
import { Language } from "../providers/language/Language.typing"

enablePromise(true)

/********** Helpers **********/

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "fthangouts.db", location: "default" },
    () => {},
    (error) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}

export const createTables = async (db: SQLiteDatabase) => {
  const userPreferencesQuery = `
    CREATE TABLE IF NOT EXISTS UserPreferences (
        id INTEGER DEFAULT 1,
        colorPreference TEXT,
        languagePreference TEXT,
        PRIMARY KEY(id)
    )
  `
  const contactsQuery = `
	  CREATE TABLE IF NOT EXISTS Contacts (
      firstName TEXT,
      name TEXT,
      phoneNumber TEXT,
      email TEXT
	  )
  `
  try {
    await db.executeSql(userPreferencesQuery)
    await db.executeSql(contactsQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables`)
  }
}

export const clearTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `DELETE FROM ${tableName}`
  try {
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to clear ${tableName} table`)
  }
}

export const removeTables = async (db: SQLiteDatabase) => {
  const contactsQuery = `DROP TABLE IF EXISTS Contacts`
  const userPreferencesQuery = `DROP TABLE IF EXISTS UserPreferences`
  try {
    await db.executeSql(contactsQuery)
    await db.executeSql(userPreferencesQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop tables`)
  }
}

export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = []
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name)
      }
    })
    return tableNames
  } catch (error) {
    console.error(error)
    throw Error("Failed to get table names from database")
  }
}

/*****************************/

/********** Getters **********/

export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  try {
    const Contacts: Contact[] = []
    const results = await db.executeSql("SELECT * FROM Contacts")
    results?.forEach((result) => {
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

export const getUserPreferences = async (db: SQLiteDatabase) => {
  try {
    const results = await db.executeSql(
      "SELECT * FROM UserPreferences WHERE id = 1"
    )
    if (results[0]?.rows?.length) {
      const userPreferences = results[0].rows.item(0)
      return {
        colorPreference: userPreferences.colorPreference,
        languagePreference: userPreferences.languagePreference,
      }
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    throw Error("Failed to get UserPreferences from database")
  }
}

/*****************************/

export const addContact = async (db: SQLiteDatabase, contact: Contact) => {
  const insertQuery = `
	  INSERT INTO Contacts (firstName, name, phoneNumber, email)
	  VALUES (?, ?, ?, ?)
	`
  const values = [
    contact.firstName,
    contact.name,
    contact.phoneNumber,
    contact.email,
  ]
  try {
    return db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to add contact")
  }
}

export const removeContact = async (db: SQLiteDatabase, contact: Contact) => {
  const deleteQuery = `
    DELETE FROM Contacts
    WHERE name = ? AND phoneNumber = ? AND email = ?
  `
  const values = [contact.name, contact.phoneNumber, contact.email]
  try {
    return db.executeSql(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to remove contact")
  }
}

export const updateContact = async (
  db: SQLiteDatabase,
  phoneNumber: string,
  updatedContact: Contact
) => {
  const updateQuery = `
    UPDATE Contacts
    SET firstName = ?, name = ?, phoneNumber = ?, email = ?
    WHERE phoneNumber = ?
  `
  const values = [
    updatedContact.firstName,
    updatedContact.name,
    updatedContact.phoneNumber,
    updatedContact.email,
    phoneNumber,
  ]
  try {
    return db.executeSql(updateQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to update contact")
  }
}

export const updateColorPreference = async (
  db: SQLiteDatabase,
  newColorPreference: string
) => {
  const query = `
      INSERT INTO UserPreferences (id, colorPreference)
      VALUES (1, ?)
      ON CONFLICT(id) DO UPDATE SET colorPreference = ?
  `
  try {
    return db.executeSql(query, [newColorPreference, newColorPreference])
  } catch (error) {
    console.error(error)
    throw Error("Failed to update color preference")
  }
}

export const updateLanguagePreference = async (
  db: SQLiteDatabase,
  newLanguagePreference: Language
) => {
  const query = `
      INSERT INTO UserPreferences (id, languagePreference)
      VALUES (1, ?)
      ON CONFLICT(id) DO UPDATE SET languagePreference = ?
  `
  try {
    return db.executeSql(query, [newLanguagePreference, newLanguagePreference])
  } catch (error) {
    console.error(error)
    throw Error("Failed to update language preference")
  }
}
