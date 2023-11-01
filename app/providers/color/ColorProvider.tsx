import React, { useState, useEffect } from "react"
import { colors } from "../../utils/theme/colors"
import { ColorContext } from "./ColorContext"
import { connectToDatabase, getUserPreferences } from "../../db/dbService"

interface Props {
  children: React.ReactNode
}

const getDatabaseColor = async (): Promise<string> => {
  const db = await connectToDatabase()
  const databaseUserPreferences = await getUserPreferences(db)
  return databaseUserPreferences?.colorPreference ?? colors.primary
}

export const ColorProvider = ({ children }: Props) => {
  const [color, setColor] = useState<string>(colors.primary)

  useEffect(() => {
    const fetchColor = async () => {
      const fetchedColor = await getDatabaseColor()
      setColor(fetchedColor)
    }

    fetchColor()
  }, [])

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  )
}
