"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT_INFO } from "@/lib/constants"

export function HelpButton() {
  const handleWhatsAppClick = () => {
    const phone = CONTACT_INFO.phone.replace(/[^0-9]/g, "")
    const message = encodeURIComponent("Hi! I need help with dental services.")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-transform z-50"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  )
}
