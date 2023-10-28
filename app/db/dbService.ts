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
      color_preference TEXT,
      language_preference TEXT
	  );
  `

  const contactsQuery = `
	  CREATE TABLE IF NOT EXISTS Contacts (
      contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      name TEXT,
      phone_number TEXT,
      email TEXT,
	  );
  `

  await db.executeSql(userPreferencesQuery)
  await db.executeSql(contactsQuery)
}

export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  try {
    const Contacts: Contact[] = []
    const results = await db.executeSql("SELECT rowid as id FROM Contacts")
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
	  INSERT INTO Contacts (first_name, name, phone_number, email)
	  VALUES (?, ?, ?, ?, ?);
	`

  const values = [
    contact.firstName,
    contact.name,
    contact.phoneNumber,
    contact.email,
  ]

  return db.executeSql(insertQuery, values)
}

// export const deleteContact = async (db: SQLiteDatabase, id: number) => {
//   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`
//   await db.executeSql(deleteQuery)
// }
