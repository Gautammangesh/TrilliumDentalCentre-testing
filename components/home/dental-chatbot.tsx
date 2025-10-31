"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ArrowLeft, Calendar } from "lucide-react"
import { BRAND_COLORS } from "@/lib/constants"

interface ChatOption {
  id: string
  label: string
  children?: ChatOption[]
  isBooking?: boolean
}

const dentalFlowData: ChatOption[] = [
  {
    id: "regular-checkup",
    label: "REGULAR CHECK UP",
    children: [
      { id: "rvg", label: "RVG", isBooking: true },
      { id: "opg", label: "OPG", isBooking: true },
      { id: "cbct", label: "CBCT", isBooking: true },
      { id: "lab-investigation", label: "Lab Investigation", isBooking: true },
      { id: "clinical-examination", label: "Clinical Examination", isBooking: true },
    ],
  },
  {
    id: "malaligned-teeth",
    label: "Malaligned Teeth",
    children: [
      {
        id: "mal-occlusion",
        label: "MAL OCCLUSION",
        children: [
          { id: "braces-fixed", label: "Braces - Fixed", isBooking: true },
          { id: "braces-removable", label: "Braces - Removable", isBooking: true },
          { id: "aligners", label: "Aligners", isBooking: true },
        ],
      },
    ],
  },
  {
    id: "mobile-teeth",
    label: "Mobile Teeth",
    children: [
      {
        id: "gum-disease",
        label: "GUM DISEASE",
        children: [
          { id: "advanced-gum-care", label: "Advanced Gum Care", isBooking: true },
          { id: "scaling", label: "Scaling (Cleaning)", isBooking: true },
          { id: "extraction", label: "Extraction", isBooking: true },
        ],
      },
    ],
  },
  {
    id: "missing-teeth",
    label: "Missing Teeth",
    children: [
      { id: "implant", label: "Implant", isBooking: true },
      { id: "crown-bridge", label: "Crown and Bridge", isBooking: true },
      { id: "complete-denture", label: "Complete Denture", isBooking: true },
      { id: "partial-denture", label: "Partial Denture", isBooking: true },
      { id: "fixed-missing", label: "Fixed", isBooking: true },
      { id: "removable-missing", label: "Removable", isBooking: true },
    ],
  },
  {
    id: "decayed-teeth",
    label: "Decayed Teeth",
    children: [
      { id: "root-canal", label: "Root Canal Treatment", isBooking: true },
      {
        id: "fillings",
        label: "Fillings",
        children: [
          { id: "tooth-coloured-filling", label: "Tooth Coloured Filling", isBooking: true },
          { id: "cement-filling", label: "Cement Based Filling", isBooking: true },
        ],
      },
      { id: "full-coverage-crowns", label: "Full Coverage Crowns", isBooking: true },
    ],
  },
  {
    id: "child-care",
    label: "CHILD CARE",
    isBooking: true,
  },
  {
    id: "swelling-wisdom",
    label: "SWELLING / WISDOM TOOTH / LESION",
    children: [{ id: "surgical-extraction", label: "Surgical Extraction", isBooking: true }],
  },
  {
    id: "eroded-teeth",
    label: "ERODED TEETH",
    children: [{ id: "fmr", label: "Full Mouth Rehabilitation (FMR)", isBooking: true }],
  },
  {
    id: "discoloured-fractured",
    label: "DISCOLOURED / FRACTURED TOOTH",
    children: [
      { id: "teeth-whitening", label: "Teeth Whitening", isBooking: true },
      { id: "digital-smile", label: "Digital Smile Designing / Laminates / Veneers", isBooking: true },
      { id: "conventional-restoration", label: "Conventional Tooth Coloured Restorations", isBooking: true },
    ],
  },
]

export function DentalChatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentPath, setCurrentPath] = useState<ChatOption[]>([])
  const [history, setHistory] = useState<ChatOption[][]>([])

  const getCurrentOptions = (): ChatOption[] => {
    if (currentPath.length === 0) return dentalFlowData
    const lastItem = currentPath[currentPath.length - 1]
    return lastItem.children || []
  }

  const handleOptionClick = (option: ChatOption) => {
    if (option.isBooking) {
      // Navigate to booking page
      window.location.href = "/book-appointment"
      return
    }

    if (option.children && option.children.length > 0) {
      setHistory([...history, currentPath])
      setCurrentPath([...currentPath, option])
    }
  }

  const handleBack = () => {
    if (history.length > 0) {
      const previousPath = history[history.length - 1]
      setCurrentPath(previousPath)
      setHistory(history.slice(0, -1))
    } else {
      setCurrentPath([])
    }
  }

  const handleReset = () => {
    setCurrentPath([])
    setHistory([])
  }

  const currentOptions = getCurrentOptions()
  const currentTitle = currentPath.length > 0 ? currentPath[currentPath.length - 1].label : "How can we help you today?"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Chatbot Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <Card className="shadow-2xl">
              <CardHeader
                className="text-white relative"
                style={{ background: `linear-gradient(135deg, ${BRAND_COLORS.blue}, ${BRAND_COLORS.maroon})` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentPath.length > 0 && (
                      <Button variant="ghost" size="icon" onClick={handleBack} className="text-white hover:bg-white/20">
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                    )}
                    <CardTitle className="text-xl">
                      {currentPath.length === 0 ? "Dental Care Assistant" : currentTitle}
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                {currentPath.length === 0 && (
                  <p className="text-sm text-pink-100 mt-2">
                    Select one option that best describes your need, then click to continue
                  </p>
                )}
              </CardHeader>

              <CardContent className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        onClick={() => handleOptionClick(option)}
                        variant="outline"
                        className="w-full h-auto py-4 px-4 text-left justify-start hover:shadow-md transition-all"
                        style={{
                          borderColor: BRAND_COLORS.pink,
                          color: BRAND_COLORS.maroon,
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{option.label}</span>
                          {option.isBooking && <Calendar className="w-4 h-4 ml-2" />}
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {currentPath.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={handleReset}
                      variant="ghost"
                      className="text-sm"
                      style={{ color: BRAND_COLORS.blue }}
                    >
                      Start Over
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
