export const sendWhatsAppMessage = async (to: string, message: string) => {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  if (!phoneNumberId || !accessToken) {
    console.error("WhatsApp credentials not configured")
    return { success: false, error: "WhatsApp not configured" }
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/\D/g, ""), // Remove non-numeric characters
        type: "text",
        text: {
          body: message,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || "WhatsApp API error")
    }

    return { success: true, data }
  } catch (error) {
    console.error("WhatsApp sending failed:", error)
    return { success: false, error }
  }
}

export const sendWhatsAppTemplate = async (to: string, templateName: string, parameters: string[]) => {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  if (!phoneNumberId || !accessToken) {
    return { success: false, error: "WhatsApp not configured" }
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/\D/g, ""),
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "en",
          },
          components: [
            {
              type: "body",
              parameters: parameters.map((param) => ({
                type: "text",
                text: param,
              })),
            },
          ],
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || "WhatsApp API error")
    }

    return { success: true, data }
  } catch (error) {
    console.error("WhatsApp template sending failed:", error)
    return { success: false, error }
  }
}
