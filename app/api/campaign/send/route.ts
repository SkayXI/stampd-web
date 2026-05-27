// POST /api/campaign/send
// Triggered from the dashboard campaign sender.
// Creates a campaign record and sends WhatsApp messages to opted-in customers.

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { sendBulk, TEMPLATES } from "@/lib/whatsapp"

const body = z.object({
  shopId:       z.string(),
  type:         z.enum(["SLOW_DAY", "DISCOUNT", "NEW_ITEM"]),
  offerText:    z.string().min(1).max(120),
  expiresAt:    z.string().datetime().optional(),
  filterDays:   z.number().optional(),  // only customers who haven't visited in N days
})

export async function POST(req: NextRequest) {
  const parsed = body.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data

  // 1. Verify shop exists + is on Marketing plan
  const shop = await db.shop.findUnique({ where: { id: data.shopId } })
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 })
  if (shop.plan !== "MARKETING") {
    return NextResponse.json({ error: "WhatsApp campaigns require the Marketing plan" }, { status: 403 })
  }

  // 2. Build customer list (opted-in only)
  const cutoff = data.filterDays
    ? new Date(Date.now() - data.filterDays * 24 * 60 * 60 * 1000)
    : undefined

  const customers = await db.customer.findMany({
    where: {
      shopId: shop.id,
      whatsappOptIn: true,
      ...(cutoff ? { OR: [{ lastVisitAt: null }, { lastVisitAt: { lt: cutoff } }] } : {}),
    },
    select: { id: true, phone: true, firstName: true },
  })

  if (customers.length === 0) {
    return NextResponse.json({ message: "No eligible customers found", sent: 0 })
  }

  // 3. Create campaign record
  const templateKey = data.type === "SLOW_DAY" ? "SLOW_DAY_OFFER"
    : data.type === "DISCOUNT" ? "DISCOUNT"
    : "NEW_ITEM"

  const campaign = await db.campaign.create({
    data: {
      shopId:     shop.id,
      type:       data.type,
      templateId: TEMPLATES[templateKey],
      offerText:  data.offerText,
      expiresAt:  data.expiresAt ? new Date(data.expiresAt) : undefined,
      status:     "SENDING",
      recipients: {
        create: customers.map(c => ({ customerId: c.id, status: "PENDING" })),
      },
    },
  })

  // 4. Send messages
  const { sent, failed } = await sendBulk(
    customers.map(c => ({ phone: c.phone, firstName: c.firstName })),
    templateKey,
    [data.offerText]
  )

  // 5. Mark campaign sent
  await db.campaign.update({
    where: { id: campaign.id },
    data: { status: "SENT", sentAt: new Date() },
  })

  return NextResponse.json({ success: true, sent, failed, total: customers.length })
}
