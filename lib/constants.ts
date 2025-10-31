// Application constants

export const BRAND_COLORS = {
  maroon: "#8B2635",
  pink: "#F4C2C2",
  cream: "#FFF8E7",
  green: "#4A7C59",
} as const

export const CONTACT_INFO = {
  phone: "+91 9136729121",
  email: "info@trilliumdentalcentre.com",
  address: {
    line1: "Sai Sampanna Bldg, Ground Floor",
    line2: "Behind BEST Depot",
    line3: "Vikhroli (East), Mumbai-83",
  },
  hours: {
    weekdays: "Monday - Saturday",
    time: "8:00 AM - 9:00 PM",
  },
} as const

export const SERVICES = [
  "Full Mouth Rehabilitation",
  "Dental Implants",
  "Root Canal Treatment",
  "Orthodontic Care (Braces/Invisalign)",
  "Teeth Whitening",
  "Digital Smile Designing",
  "Gum Treatment (Periodontics)",
  "Pediatric Dentistry",
  "Dentures",
  "Crowns, Inlays & Onlays",
  "Porcelain Veneers",
  "Oral Surgery",
  "TMJ Dysfunction Therapy",
  "Tobacco Cessation Therapy",
  "Emergency Dental Care",
  "Preventive Checkup",
  "Other",
] as const

export const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
] as const
