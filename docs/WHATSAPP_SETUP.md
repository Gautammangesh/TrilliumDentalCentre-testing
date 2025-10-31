# WhatsApp Business Cloud API Setup Guide

This guide will help you set up WhatsApp Business Cloud API for sending notifications.

## Prerequisites

1. A Facebook Business Account
2. A verified business phone number
3. A Meta Developer Account

## Step-by-Step Setup

### 1. Create a Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Business" as the app type
4. Fill in your app details and create the app

### 2. Add WhatsApp Product

1. In your app dashboard, click "Add Product"
2. Find "WhatsApp" and click "Set Up"
3. Follow the setup wizard

### 3. Get Your Credentials

After setup, you'll need these values for your `.env` file:

\`\`\`env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token
\`\`\`

#### Finding Your Phone Number ID:
1. Go to WhatsApp → API Setup
2. Copy the "Phone number ID"

#### Getting Access Token:
1. Go to WhatsApp → API Setup
2. Click "Generate Token"
3. Copy the temporary token (valid for 24 hours)
4. For production, create a permanent token in System Users

#### Business Account ID:
1. Go to WhatsApp → API Setup
2. Find "WhatsApp Business Account ID"

### 4. Verify Your Phone Number

1. In WhatsApp → API Setup
2. Click "Verify" next to your phone number
3. Follow the verification process

### 5. Create Message Templates (Optional)

For production use, you need approved message templates:

1. Go to WhatsApp → Message Templates
2. Click "Create Template"
3. Design your template following WhatsApp guidelines
4. Submit for approval (usually takes 24-48 hours)

### 6. Test Your Integration

Use the test endpoint in the admin panel:

\`\`\`
POST /api/notifications/test
{
  "email": "test@example.com",
  "whatsappNumber": "+919876543210"
}
\`\`\`

## Important Notes

- **Sandbox Mode**: Initially, you can only send messages to 5 test numbers
- **Production Mode**: After business verification, you can message any number
- **Message Templates**: Required for production use
- **Rate Limits**: Free tier has limits; check Meta's pricing for higher volumes
- **24-Hour Window**: You can send template messages anytime, but free-form messages only within 24 hours of user interaction

## Troubleshooting

### Common Issues:

1. **"Invalid phone number"**
   - Ensure number includes country code (e.g., +91 for India)
   - Remove any spaces or special characters

2. **"Access token expired"**
   - Generate a new token or create a permanent system user token

3. **"Template not found"**
   - Ensure template is approved
   - Check template name spelling

4. **"Recipient not in allowed list"**
   - Add test numbers in sandbox mode
   - Complete business verification for production

## Resources

- [WhatsApp Business Platform Documentation](https://developers.facebook.com/docs/whatsapp)
- [Message Templates Guide](https://developers.facebook.com/docs/whatsapp/message-templates)
- [API Reference](https://developers.facebook.com/docs/whatsapp/cloud-api/reference)
