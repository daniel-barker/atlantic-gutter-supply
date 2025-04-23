import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/products - Get all products
export async function GET(_request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.slug || !data.categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if product with slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug: data.slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "A product with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the product
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        price: data.price !== undefined ? parseFloat(data.price) : null,
        sku: data.sku,
        imageUrl: data.imageUrl,
        inStock: data.inStock === true || String(data.inStock).toLowerCase() === 'true',
        featured: data.featured === true || String(data.featured).toLowerCase() === 'true',
        featuredOrder: data.featuredOrder ? parseInt(data.featuredOrder) : null,
        categoryId: data.categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
