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
    console.log("Received form data:", Object.fromEntries(formData));

    const name = formData.get("name");
    const details = formData.get("details");
    const type = formData.get("type");
    const customType = formData.get("customType");
    const amount = formData.get("amount");
    const included = formData.get("included");
    const excluded = formData.get("excluded");
    const duration = formData.get("duration");
    const nights = formData.get("nights");
    const image = formData.get("image") as File | null;

    if (!name || typeof name !== "string") {
      return new NextResponse("Invalid name", { status: 400 });
    }
    if (!details || typeof details !== "string") {
      return new NextResponse("Invalid details", { status: 400 });
    }
    if (!type || !Object.values(PackageType).includes(type as PackageType)) {
      return new NextResponse("Invalid package type", { status: 400 });
    }
    if (!amount || isNaN(Number(amount))) {
      return new NextResponse("Invalid amount", { status: 400 });
    }
    if (!duration || isNaN(Number(duration))) {
      return new NextResponse("Invalid duration", { status: 400 });
    }
    if (!nights || isNaN(Number(nights))) {
      return new NextResponse("Invalid nights", { status: 400 });
    }

    let parsedIncluded: string[] = [];
    let parsedExcluded: string[] = [];
    
    try {
      parsedIncluded = included ? JSON.parse(included as string) : [];
      parsedExcluded = excluded ? JSON.parse(excluded as string) : [];
    } catch (error) {
      console.error("JSON parsing error:", error);
      return new NextResponse("Invalid included/excluded format", { status: 400 });
    }

    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await uploadImage(image);
      } catch (error) {
        console.error("Image upload failed:", error);
        return new NextResponse("Image upload failed", { status: 400 });
      }
    }

    const tourPackage = await prisma.package.create({
      data: {
        name,
        details,
        type: type as PackageType,
        customType: type === PackageType.OTHER ? (customType as string) : undefined,
        amount: Number(amount),
        included: parsedIncluded,
        excluded: parsedExcluded,
        duration: Number(duration),
        nights: Number(nights),
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


