// POST /api/customer/register
// Called when a new customer scans the shop QR for the first time
// and submits their details (name, phone, birthday + WhatsApp consent).
// Creates customer record, generates wallet pass, returns pass download URL.

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { createPass } from "@/lib/passkit"

const body = z.object({
  shopSlug:       z.string(),
  firstName:      z.string().min(1).max(50),
  phone:          z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  birthdayMonth:  z.number().min(1).max(12).optional(),
  birthdayDay:    z.number().min(1).max(31).optional(),
  whatsappOptIn:  z.boolean(),
})

export async function POST(req: NextRequest) {
  const parsed = body.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data

  // 1. Find shop
  const shop = await db.shop.findUnique({ where: { slug: data.shopSlug } })
  if (!shop || !shop.isActive) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 })
  }

  // 2. Check if already registered (idempotent)
  const existing = await db.customer.findUnique({
    where: { shopId_phone: { shopId: shop.id, phone: data.phone } },
  })
  if (existing?.passKitId) {
    return NextResponse.json({
      alreadyRegistered: true,
      message: `Welcome back, ${existing.firstName}! You already have a card.`,
    })
  }

  // 3. Create customer record
  const customer = await db.customer.create({
    data: {
      shopId:        shop.id,
      firstName:     data.firstName,
      phone:         data.phone,
      birthdayMonth: data.birthdayMonth,
      birthdayDay:   data.birthdayDay,
      whatsappOptIn: data.whatsappOptIn,
      stamps:        0,
    },
  })

  // 4. Generate wallet pass via PassKit
  const pass = await createPass({
    shopId:      shop.id,
    shopName:    shop.name,
    logoUrl:     shop.logoUrl ?? "",
    brandColor:  shop.brandColor,
    customerName: customer.firstName,
    customerId:  customer.id,
    stamps:      0,
    stampTarget: shop.stampTarget,
    rewardText:  shop.rewardText,
  })

  // 5. Save PassKit IDs back to customer
  await db.customer.update({
    where: { id: customer.id },
    data: {
      passKitId:    pass.id,
      passSerialNo: pass.serialNumber,
    },
  })

  return NextResponse.json({
    success: true,
    customerName: customer.firstName,
    passDownloadUrl: pass.downloadUrl,  // redirect customer here to add to wallet
  })
}
