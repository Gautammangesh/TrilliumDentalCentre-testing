import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { BRAND_COLORS, CONTACT_INFO } from "@/lib/constants"

export function Footer() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <footer className="text-white" style={{ background: `linear-gradient(to right, ${BRAND_COLORS.maroon}, #A0344A)` }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/32cdbdb36_Screenshot_2025-10-04_081758-removebg-preview.png"
              alt="Trillium Dental Centre"
              className="h-20 mb-4 object-contain bg-white/10 p-2 rounded-lg"
            />
            <p className="text-pink-200 text-sm leading-relaxed">
              "Pathway to healthy smile..." - Trusted dental care for over 20 years
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-pink-200 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-pink-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  {CONTACT_INFO.address.line1}
                  <br />
                  {CONTACT_INFO.address.line2}
                  <br />
                  {CONTACT_INFO.address.line3}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {CONTACT_INFO.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {CONTACT_INFO.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-pink-200">
              <li>{CONTACT_INFO.hours.weekdays}</li>
              <li className="font-semibold text-white">{CONTACT_INFO.hours.time}</li>
              <li className="mt-4 text-yellow-300">🎉 Book online & get 20% OFF!</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-pink-700 pt-8">
          <h4 className="font-semibold mb-4 text-center text-xl">Visit Us</h4>
          <div className="rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8267!2d72.9314!3d19.1115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzQxLjQiTiA3MsKwNTUnNTMuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Trillium Dental Centre Location"
            />
          </div>
          <p className="text-center text-pink-200 text-sm mt-4">
            Sai Sampanna Bldg, Ground Floor, Behind BEST Depot, Vikhroli (East), Mumbai-83
          </p>
        </div>

        <div className="border-t border-pink-700 mt-8 pt-8 text-center text-sm text-pink-300">
          <p>© {new Date().getFullYear()} Trillium Dental Centre. All rights reserved.</p>
          <p className="mt-2 italic">"Transforming Smiles, Enhancing Confidence"</p>
        </div>
      </div>
    </footer>
  )
}
