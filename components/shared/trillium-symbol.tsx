import { BRAND_COLORS } from "@/lib/constants"

export function TrilliumSymbol() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/b9f56f5e4_image.png"
              alt="Trillium - White Lily"
              className="w-64 h-64 mx-auto rounded-full object-cover shadow-xl"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_COLORS.maroon }}>
              The Three Petalled "Trinity Lily"
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">(Mary's Garden)</span>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed italic">
              "A three petalled lily in Mary's Garden signifies the Holy Trinity. The Blossoms of Trillium symbolizes
              spiritual embodiment, beauty, conscientiousness, grace, and recovery."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
