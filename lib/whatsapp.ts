// Stampd — WhatsApp Business API helper
// Uses Meta Cloud API (or 360dialog as gateway)
// All outbound messages must use pre-approved Meta templates.

const WA_API_URL = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`
const WA_TOKEN = process.env.WHATSAPP_TOKEN!

// ─── Approved template names (configure in Meta Business Manager) ─────────────
// These must be approved before use. Stampd maintains a library of 10-15 templates.

export const TEMPLATES = {
  SLOW_DAY_OFFER:  "stampd_slow_day_offer",   // "Hey {{1}}! Come in before {{2}} and get {{3}} off."
  DISCOUNT:        "stampd_discount",          // "Hey {{1}}! Your next order is {{2}} off today only."
  BIRTHDAY:        "stampd_birthday",          // "Happy Birthday {{1}}! Your free birthday coffee is waiting."
  NEW_ITEM:        "stampd_new_item",          // "Hey {{1}}! We just launched {{2}}. Come try it!"
  MILESTONE:       "stampd_milestone",         // "Hey {{1}}! You're halfway to your free coffee — {{2}} more stamps to go."
} as const

type TemplateKey = keyof typeof TEMPLATES

interface SendMessageOptions {
  to: string          // WhatsApp number with country code, e.g. "+201001234567"
  template: TemplateKey
  params: string[]    // positional params matching template placeholders
}

interface SendResult {
  messageId: string
  status: "sent" | "failed"
}

// Send a single templated WhatsApp message
export async function sendMessage(opts: SendMessageOptions): Promise<SendResult> {
  const res = await fetch(WA_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${WA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: opts.to,
      type: "template",
      template: {
        name: TEMPLATES[opts.template],
        language: { code: "en" },
        components: [{
          type: "body",
          parameters: opts.params.map(p => ({ type: "text", text: p })),
        }],
      },
    }),
  })

  if (!res.ok) {
    console.error(`WhatsApp send failed for ${opts.to}:`, await res.text())
    return { messageId: "", status: "failed" }
  }

  const data = await res.json()
  return {
    messageId: data.messages?.[0]?.id ?? "",
    status: "sent",
  }
}

// Send to multiple customers (used by campaign sender)
export async function sendBulk(
  recipients: { phone: string; firstName: string }[],
  template: TemplateKey,
  extraParams: string[]   // params after firstName
): Promise<{ sent: number; failed: number }> {
  let sent = 0
  let failed = 0

  // Rate-limit: ~80 messages/min on Meta free tier
  for (const recipient of recipients) {
    const result = await sendMessage({
      to: recipient.phone,
      template,
      params: [recipient.firstName, ...extraParams],
    })
    result.status === "sent" ? sent++ : failed++
    await sleep(750)  // ~80/min
  }

  return { sent, failed }
}

// Automated birthday messages — called by daily cron at 9am
export async function sendBirthdayMessages(
  customers: { phone: string; firstName: string; shopName: string }[]
) {
  for (const c of customers) {
    await sendMessage({
      to: c.phone,
      template: "BIRTHDAY",
      params: [c.firstName, c.shopName],
    })
    await sleep(750)
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
