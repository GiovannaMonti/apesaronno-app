export function formatDate(date) {
  const eventDateTime = new Date(Date.parse(date))

  const day = eventDateTime.getDate()
  const month = eventDateTime.toLocaleString("it-IT", { month: "long" })
  const year = eventDateTime.getFullYear()

  return `${day} ${month} ${year}`
}
