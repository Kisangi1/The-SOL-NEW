import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type");
    
    const validatedPage = Math.max(1, page);
    const validatedLimit = Math.min(Math.max(1, limit), 50);

    const skip = (validatedPage - 1) * validatedLimit;
    const where = type ? { type } : {};

    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        take: validatedLimit,
        skip,
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          description: true,
          amount: true,
          numberOfDays: true,
          dayOrNight: true,
          type: true,
          imageData: true,
        },
      }),
      prisma.package.count({ where }),
    ]);

    return NextResponse.json({
      packages,
      metadata: {
        total,
        page: validatedPage,
        limit: validatedLimit,
        totalPages: Math.ceil(total / validatedLimit),
      },
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}