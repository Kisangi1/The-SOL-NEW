import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const PACKAGES_CACHE = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Public GET endpoint - no auth required
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type");
    
    const cacheKey = `packages-${page}-${limit}-${type}`;
    const cached = PACKAGES_CACHE.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }

    const skip = (page - 1) * limit;
    const where = type ? { type } : {};

    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        take: limit,
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

    const response = {
      packages,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    PACKAGES_CACHE.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Protected POST endpoint - requires auth
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const requiredFields = ["name", "description", "amount", "numberOfDays", "dayOrNight", "type"];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(", ")}` 
      }, { status: 400 });
    }

    const newPackage = await prisma.package.create({
      data: {
        name: body.name,
        description: body.description,
        imageData: body.imageData,
        amount: Number(body.amount),
        numberOfDays: Number(body.numberOfDays),
        dayOrNight: body.dayOrNight,
        type: body.type,
      },
    });

    PACKAGES_CACHE.clear();

    return NextResponse.json({
      message: "Package created successfully",
      package: newPackage
    });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
