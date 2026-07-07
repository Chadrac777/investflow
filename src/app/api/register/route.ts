import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password, name, referrerCode } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    let referrerId = null;
    if (referrerCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referrerCode },
      });
      if (!referrer) {
        return NextResponse.json(
          { message: "Invalid referral code" },
          { status: 400 }
        );
      }
      referrerId = referrer.id;
    }

    const hashedPassword = await hash(password, 10);
    
    // Generate a unique referral code for the new user
    let userReferralCode = "";
    let isUnique = false;
    while (!isUnique) {
      userReferralCode = crypto.randomBytes(4).toString("hex").toUpperCase();
      const existingCode = await prisma.user.findUnique({
        where: { referralCode: userReferralCode },
      });
      if (!existingCode) isUnique = true;
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        referralCode: userReferralCode,
        referrerId,
        balance: 50000.0,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Error registering user", error: error.message },
      { status: 500 }
    );
  }
}
