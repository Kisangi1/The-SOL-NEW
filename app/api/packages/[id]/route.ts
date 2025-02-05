// app/api/packages/[id]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import { PackageType } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    console.log("Update form data:", Object.fromEntries(formData));

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
    } catch {
      return new NextResponse("Invalid included/excluded format", { status: 400 });
    }

    let imageUrl;
    if (image) {
      try {
        imageUrl = await uploadImage(image);
      } catch (error) {
        console.error("Image upload failed:", error);
        return new NextResponse("Image upload failed", { status: 400 });
      }
    }

    const packageData = await prisma.package.update({
      where: { id: params.id },
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
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json(packageData);
  } catch (error) {
    console.error("[PACKAGE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const packageData = await prisma.package.findUnique({
      where: { id: params.id },
    });

    if (!packageData) {
      return new NextResponse("Package not found", { status: 404 });
    }

    return NextResponse.json(packageData);
  } catch (error) {
    console.error("[PACKAGE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Package ID is required", { status: 400 });
    }

    const packageData = await prisma.package.delete({
      where: { id: params.id },
    });

    return NextResponse.json(packageData);
  } catch (error) {
    console.error("[PACKAGE_DELETE]", error);
    if ((error as { code?: string }).code === 'P2025') {
      return new NextResponse("Package not found", { status: 404 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
