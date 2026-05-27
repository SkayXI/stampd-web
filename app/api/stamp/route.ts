// POST /api/stamp
// Called by the barista scanner app after scanning a customer's wallet card barcode.
// Validates the scan, increments stamp count, triggers reward if threshold reached,
// and pushes a pass update to the customer's phone via PassKit.

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { updatePass } from "@/lib/passkit"

const body = z.object({
  passSerialNo: z.string(),   // scanned from the wallet card barcode
  baristaNotes: z.string().optional(),
})

export async function POST(req: NextRequest) {
  // 1. Validate request
  const parsed = body.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { passSerialNo, baristaNotes } = parsed.data

  // 2. Find customer by pass serial
  const customer = await db.customer.findUnique({
    where: { passSerialNo },
    include: { shop: true },
  })

  if (!customer) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 })
  }

  const { shop } = customer
  const stampsBefore = customer.stamps
  const isReward = stampsBefore + 1 >= shop.stampTarget

  // 3. Update stamp count (reset to 0 if reward reached)
  const stampsAfter = isReward ? 0 : stampsBefore + 1

  const [updatedCustomer] = await db.$transaction([
    db.customer.update({
      where: { id: customer.id },
      data: {
        stamps: stampsAfter,
        totalStamps: { increment: 1 },
        totalRewards: isReward ? { increment: 1 } : undefined,
        lastVisitAt: new Date(),
      },
    }),
    db.stampEvent.create({
      data: {
        customerId: customer.id,
        type: isReward ? "REWARD" : "STAMP",
        stampsBefore,
        stampsAfter,
        baristaNotes,
      },
    }),
  ])

  // 4. Push update to wallet card
  if (customer.passKitId) {
    await updatePass(
      customer.passKitId,
      stampsAfter,
      shop.stampTarget,
      shop.rewardText
    )
  }

  return NextResponse.json({
    success: true,
    customerName: customer.firstName,
    stamps: stampsAfter,
    stampTarget: shop.stampTarget,
    isReward,
    message: isReward
      ? `🎉 Reward earned! ${customer.firstName} gets a free drink.`
      : `Stamp added. ${customer.firstName} has ${stampsAfter}/${shop.stampTarget} stamps.`,
  })
}
