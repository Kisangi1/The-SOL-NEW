// app/api/packages/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import { PackageType } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const details = formData.get("details") as string;
    const type = formData.get("type") as keyof typeof PackageType;
    const customType = formData.get("customType") as string;
    const amount = Number(formData.get("amount"));
    const included = JSON.parse(formData.get("included") as string);
    const excluded = JSON.parse(formData.get("excluded") as string);
    const duration = Number(formData.get("duration"));
    const nights = Number(formData.get("nights"));
    const image = formData.get("image") as File;

    if (!name || !details || !type || !amount || !duration || !nights) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const tourPackage = await prisma.package.create({
      data: {
        name,
        details,
        type: PackageType[type],
        customType: type === "OTHER" ? customType : undefined,
        amount,
        included,
        excluded,
        duration,
        nights,
        imageUrl,
      },
    });

    return NextResponse.json(tourPackage);
  } catch (error) {
    console.error("[PACKAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const type = searchParams.get("type") as PackageType | undefined;
    const pageSize = 9;
    const skip = (page - 1) * pageSize;

    const where = type ? { type } : {};

    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: pageSize,
        skip,
      }),
      prisma.package.count({ where }),
    ]);

    return NextResponse.json({
      packages,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("[PACKAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

