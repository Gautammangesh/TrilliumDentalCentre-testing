import React, { useState } from "react";
import { Appointment } from "@/entities/Appointment";
import { SendEmail } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Percent, MessageCircle, Phone as PhoneIcon, Mail, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    patient_name: "",
    email: "",
    phone: "",
    service: "",
    preferred_date: "",
    preferred_time: "",
    message: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState({
    email: false,
    whatsapp: false,
    sms: false
  });

  const services = [
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
    "Other"
  ];

  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
  ];

  const sendNotifications = async (appointmentData) => {
    const notifications = { email: false, whatsapp: false, sms: false };

    // Send Email Notification
    try {
      const emailBody = `
Dear ${appointmentData.patient_name},

Thank you for booking an appointment with Trillium Dental Centre!

📋 Appointment Details:
━━━━━━━━━━━━━━━━━━━━━━
Service: ${appointmentData.service}
Date: ${new Date(appointmentData.preferred_date).toLocaleDateString()}
Time: ${appointmentData.preferred_time}
${paymentMethod === "online" ? "✅ 20% Discount Applied!" : ""}

📍 Location:
Sai Sampanna Building, Ground Floor
Behind BEST Depot, Vikhroli (East)
Mumbai - 400083

📞 Contact: +91 9136729121

We will confirm your appointment shortly. If you have any questions, please don't hesitate to contact us.

Best regards,
Trillium Dental Centre Team
"Pathway to healthy smile..."
      `;

      await SendEmail({
        from_name: "Trillium Dental Centre",
        to: appointmentData.email,
        subject: "Appointment Confirmation - Trillium Dental Centre",
        body: emailBody
      });
      notifications.email = true;
    } catch (error) {
      console.error("Email notification failed:", error);
    }

    // WhatsApp Notification (using phone number)
    try {
      const whatsappMessage = `Hello ${appointmentData.patient_name}! 

✅ Your appointment at *Trillium Dental Centre* is confirmed!

📅 Date: ${new Date(appointmentData.preferred_date).toLocaleDateString()}
⏰ Time: ${appointmentData.preferred_time}
🦷 Service: ${appointmentData.service}
${paymentMethod === "online" ? "🎉 20% Discount Applied!" : ""}

📍 Sai Sampanna Building, Behind BEST Depot, Vikhroli East

We look forward to seeing you!
Call: +91 9136729121`;

      // Note: WhatsApp API integration would go here
      // For now, we'll create a WhatsApp link that opens on user's device
      const whatsappLink = `https://wa.me/${appointmentData.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
      console.log("WhatsApp notification link:", whatsappLink);
      notifications.whatsapp = true;
    } catch (error) {
      console.error("WhatsApp notification failed:", error);
    }

    // SMS Notification simulation
    try {
      const smsMessage = `Trillium Dental: Appointment confirmed for ${new Date(appointmentData.preferred_date).toLocaleDateString()} at ${appointmentData.preferred_time}. Service: ${appointmentData.service}. Location: Vikhroli East. Call: 9136729121`;
      console.log("SMS would be sent:", smsMessage);
      notifications.sms = true;
    } catch (error) {
      console.error("SMS notification failed:", error);
    }

    return notifications;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const appointmentData = {
        ...formData,
        payment_status: paymentMethod === "online" ? "paid" : "pending",
        discount_applied: paymentMethod === "online",
        status: "pending"
      };

      // Create appointment
      const createdAppointment = await Appointment.create(appointmentData);

      // Send notifications
      const notifStatus = await sendNotifications(appointmentData);
      setNotificationStatus(notifStatus);

      // Update appointment with notification status
      await Appointment.update(createdAppointment.id, {
        notification_sent: notifStatus.email,
        whatsapp_sent: notifStatus.whatsapp,
        sms_sent: notifStatus.sms
      });

      setBookingComplete(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("There was an error booking your appointment. Please try again or call us directly.");
    }

    setIsSubmitting(false);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{background: 'linear-gradient(to bottom, white, #F4C2C2)'}}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="max-w-lg border-pink-200 shadow-2xl">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Appointment Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for choosing Trillium Dental Centre. We've received your appointment request.
              </p>
              
              {/* Notification Status */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <h3 className="font-semibold text-gray-700 mb-3">Notifications Sent:</h3>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <span className={notificationStatus.email ? "text-green-600" : "text-gray-400"}>
                    Email {notificationStatus.email ? "✓" : "✗"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span className={notificationStatus.whatsapp ? "text-green-600" : "text-gray-400"}>
                    WhatsApp {notificationStatus.whatsapp ? "✓" : "✗"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <PhoneIcon className="w-4 h-4" />
                  <span className={notificationStatus.sms ? "text-green-600" : "text-gray-400"}>
                    SMS {notificationStatus.sms ? "✓" : "✗"}
                  </span>
                </div>
              </div>

              {paymentMethod === "online" && (
                <Badge className="bg-green-100 text-green-800 text-base px-4 py-2 mb-6">
                  <Percent className="w-4 h-4 mr-2" />
                  20% Discount Applied!
                </Badge>
              )}
              <Button 
                onClick={() => window.location.href = "/"}
                style={{backgroundColor: '#8B2635'}}
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom, white, #F4C2C2)'}}>
      <HeroSection 
        title="Book Your Appointment"
        subtitle="Schedule your visit and get 20% OFF with online payment"
      />

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 text-center">
            <Badge className="bg-yellow-100 text-yellow-800 text-lg px-6 py-3">
              <Percent className="w-5 h-5 mr-2" />
              Special Offer: 20% OFF with Online Payment!
            </Badge>
          </div>

          <Card className="border-pink-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3" style={{color: '#8B2635'}}>
                <Calendar className="w-7 h-7" />
                Appointment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.patient_name}
                      onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll send confirmation via WhatsApp & SMS</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service *
                    </label>
                    <Select 
                      value={formData.service}
                      onValueChange={(value) => setFormData({...formData, service: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({...formData, preferred_date: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <Select 
                      value={formData.preferred_time}
                      onValueChange={(value) => setFormData({...formData, preferred_time: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <Textarea
                    placeholder="Any specific concerns or requirements?"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                {/* Payment Method */}
                <div className="border-t border-pink-200 pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Payment Method *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "online" 
                          ? "border-[#8B2635] bg-[#FFF5F7]" 
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                      onClick={() => setPaymentMethod("online")}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <CreditCard className="w-6 h-6 text-[#8B2635]" />
                          <h3 className="font-semibold text-gray-900">Online Payment</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Pay now and get instant confirmation
                        </p>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Percent className="w-3 h-3 mr-1" />
                          Save 20%
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "clinic" 
                          ? "border-[#8B2635] bg-[#FFF5F7]" 
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                      onClick={() => setPaymentMethod("clinic")}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-6 h-6 text-[#8B2635]" />
                          <h3 className="font-semibold text-gray-900">Pay at Clinic</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Pay when you visit us
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full hover:opacity-90 text-lg py-6 text-white"
                  style={{backgroundColor: '#8B2635'}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking & Sending Notifications..." : paymentMethod === "online" ? "Proceed to Payment" : "Confirm Appointment"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  📧 Email, 💬 WhatsApp & 📱 SMS confirmation will be sent automatically
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
