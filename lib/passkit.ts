// Stampd — PassKit API helper
// PassKit handles Apple Wallet + Google Wallet pass generation, signing, and push updates.
// Docs: https://docs.passkit.io

const PASSKIT_API_KEY = process.env.PASSKIT_API_KEY!
const PASSKIT_BASE_URL = "https://api.passkit.net/v1"

interface CreatePassOptions {
  shopId: string
  shopName: string
  logoUrl: string
  brandColor: string
  customerName: string
  customerId: string
  stamps: number
  stampTarget: number
  rewardText: string
}

interface PassKitPass {
  id: string
  serialNumber: string
  downloadUrl: string
}

// Create a new branded loyalty pass for a customer
export async function createPass(opts: CreatePassOptions): Promise<PassKitPass> {
  const res = await fetch(`${PASSKIT_BASE_URL}/pass`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${PASSKIT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      templateId: process.env.PASSKIT_TEMPLATE_ID,
      barcode: { type: "QR", value: `stampd:customer:${opts.customerId}` },
      fields: {
        shopName: opts.shopName,
        customerName: opts.customerName,
        stampsLabel: `${opts.stamps} of ${opts.stampTarget} stamps`,
        rewardText: opts.stamps >= opts.stampTarget ? opts.rewardText : `${opts.stampTarget - opts.stamps} more to go`,
      },
      colors: {
        background: opts.brandColor,
        label: "#FFFFFF",
        foreground: "#FFFFFF",
      },
      logo: opts.logoUrl,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PassKit createPass failed: ${err}`)
  }

  return res.json()
}

// Push an update to an existing pass (called after every stamp)
export async function updatePass(passKitId: string, stamps: number, stampTarget: number, rewardText: string) {
  const isReward = stamps >= stampTarget

  const res = await fetch(`${PASSKIT_BASE_URL}/pass/${passKitId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${PASSKIT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        stampsLabel: isReward ? "🎉 Reward ready!" : `${stamps} of ${stampTarget} stamps`,
        rewardText: isReward ? rewardText : `${stampTarget - stamps} more to go`,
      },
      pushUpdate: true,  // sends push notification to customer's phone
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PassKit updatePass failed: ${err}`)
  }

  return res.json()
}
