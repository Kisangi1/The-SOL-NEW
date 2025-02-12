export const holidayImages = {
    // Kenyan Holidays
    "Labour Day": "/images/gift.svg",
    "Madaraka Day": "/images/gift.svg",
    "Mashujaa Day": "/images/gift.svg",
    "Jamhuri Day": "/images/gift.svg",
  
    // International Holidays
    "Valentine's Day": "/images/valentine.svg",
    "Christmas Day": "/images/xmas.svg",
    "New Year's Eve": "/images/gift.svg",
    "New Year's Day": "/images/gift.svg",
    "Easter Sunday": "/images/easter.svg",
    "Diwali": "/images/diwali.svg",
    "Halloween": "/images/halloween.svg",
    "Black Friday": "/images/gift.png",
    "Cyber Monday": "/images/gift.svg",
    "Mother's Day": "/images/gift.svg",
    "Father's Day": "/images/gift.svg",
  } as const
  
  export type HolidayImageKey = keyof typeof holidayImages
  
  export function getHolidayImage(holidayName: string): string {
    return holidayImages[holidayName as HolidayImageKey] || "/images/gift.png"
  }
  
  