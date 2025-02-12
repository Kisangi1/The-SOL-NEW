export type Holiday = {
    name: string
    date: Date
  }
  
  const kenyanHolidays: Holiday[] = [
    { name: "New Year's Day", date: new Date(new Date().getFullYear(), 0, 1) },
    { name: "Labour Day", date: new Date(new Date().getFullYear(), 4, 1) },
    { name: "Madaraka Day", date: new Date(new Date().getFullYear(), 5, 1) },
    { name: "Mashujaa Day", date: new Date(new Date().getFullYear(), 9, 20) },
    { name: "Jamhuri Day", date: new Date(new Date().getFullYear(), 11, 12) },
    { name: "Christmas Day", date: new Date(new Date().getFullYear(), 11, 25) },
  ]
  
  const specialOccasions: Holiday[] = [
    { name: "Valentine's Day", date: new Date(new Date().getFullYear(), 1, 14) },
    { name: "Easter Sunday", date: new Date(new Date().getFullYear(), 3, 9) },
    { name: "Mother's Day", date: new Date(new Date().getFullYear(), 4, 14) },
    { name: "Father's Day", date: new Date(new Date().getFullYear(), 5, 18) },
    { name: "Diwali", date: new Date(new Date().getFullYear(), 10, 12) }, // Date varies each year
    { name: "Halloween", date: new Date(new Date().getFullYear(), 9, 31) },
    { name: "Black Friday", date: new Date(new Date().getFullYear(), 10, 24) },
    { name: "Cyber Monday", date: new Date(new Date().getFullYear(), 10, 27) },
    { name: "New Year's Eve", date: new Date(new Date().getFullYear(), 11, 31) },
  ]
  
  export function getUpcomingHoliday(): { holiday: Holiday; daysUntil: number } | null {
    const today = new Date()
    const allHolidays = [...kenyanHolidays, ...specialOccasions]
  
    for (const holiday of allHolidays) {
      const holidayDate = new Date(today.getFullYear(), holiday.date.getMonth(), holiday.date.getDate())
      const timeDiff = holidayDate.getTime() - today.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
  
      if (daysDiff >= 0 && daysDiff <= 2) {
        return { holiday, daysUntil: daysDiff }
      }
    }
  
    return null
  }
  
    export function isHoliday(): Holiday | null {
        const today = new Date()
        const allHolidays = [...kenyanHolidays, ...specialOccasions]
    
        for (const holiday of allHolidays) {
        const holidayDate = new Date(today.getFullYear(), holiday.date.getMonth(), holiday.date.getDate())
        const timeDiff = holidayDate.getTime() - today.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    
        if (daysDiff === 0) {
            return holiday
        }
        }
    
        return null
    }  