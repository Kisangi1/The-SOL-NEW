
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import { PackageType } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }  // Change from packageId to id
) {
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
    const image = formData.get("image") as File | null;

    if (!name || !details || !type || !amount || !duration || !nights) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let imageUrl;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const packageData = await prisma.package.update({
      where: { id: params.id },  // Change from params.packageId to params.id
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
  { params }: { params: { packageId: string } }
) {
  try {
    const packageData = await prisma.package.findUnique({
      where: { id: params.packageId },
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

// app/api/packages/[id]/route.ts
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