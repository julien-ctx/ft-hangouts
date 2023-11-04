export const formatDateString = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`
}

export const formatDateStringMessage = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${month}/${day}/${year} - ${hours}:${minutes}`
}

export const formatDateStringTimestamp = (dateString: string | null) => {
  if (dateString) {
    const [datePart, timePart] = dateString.split(" - ")
    const [month, day, year] = datePart.split("/").map(Number)
    const [hours, minutes, seconds] = timePart.split(":").map(Number)

    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds)

    return dateObject.getTime()
  } else {
    return Date.now()
  }
}
