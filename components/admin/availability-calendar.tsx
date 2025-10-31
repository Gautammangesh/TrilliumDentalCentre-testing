"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

export function AvailabilityCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAvailable, setIsAvailable] = useState(true)
  const [reason, setReason] = useState("")

  const handleSave = async () => {
    if (!date) return

    try {
      await fetch("/api/doctor-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          isAvailable,
          reason: !isAvailable ? reason : undefined,
          timeSlots: [
            { time: "09:00 AM", isBooked: false },
            { time: "10:00 AM", isBooked: false },
            { time: "11:00 AM", isBooked: false },
            { time: "02:00 PM", isBooked: false },
            { time: "03:00 PM", isBooked: false },
            { time: "04:00 PM", isBooked: false },
          ],
        }),
      })
    } catch (error) {
      console.error("Failed to save availability:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full">Set Availability</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Doctor Availability</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="available">Available</Label>
                <Switch id="available" checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
              {!isAvailable && (
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Input
                    id="reason"
                    placeholder="e.g., On leave, Emergency"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              )}
              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
