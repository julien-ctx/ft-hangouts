import React, { useState, useEffect } from "react"
import { colors } from "../../utils/theme/colors"
import { ColorContext } from "./ColorContext"
import {
  connectToDatabase,
  createTables,
  getSingleUserPreference,
} from "../../db/dbService"

interface Props {
  children: React.ReactNode
}

const getDatabaseColor = async (): Promise<string> => {
  const db = await connectToDatabase()
  await createTables(db)
  const colorPreference = await getSingleUserPreference(db, "colorPreference")
  return colorPreference ?? colors.primary
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
