import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/featured - Get featured products
export async function GET() {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        featured: true,
      },
      include: {
        category: true,
      },
      orderBy: [
        // First order by featuredOrder if it exists
        {
          featuredOrder: 'asc',
        },
        // Then by name as a fallback
        {
          name: 'asc',
        },
      ],
    });

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}
