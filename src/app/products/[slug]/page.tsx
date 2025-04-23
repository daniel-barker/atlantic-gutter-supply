import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    return null;
  }

  return product;
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: {
        not: currentProductId,
      },
    },
    take: 4,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Ensure params is properly awaited before accessing its properties
  const { slug } = await Promise.resolve(params);
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product image */}
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
            <div className="h-96 w-full bg-gray-200 relative">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Product details */}
          <div className="mt-10 lg:mt-0 lg:pl-8">
            <div className="mb-4">
              <Link href="/products" className="text-blue-600 hover:text-blue-800">
                ← Back to Products
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                {product.category.name}
              </span>
              {product.inStock ? (
                <span className="ml-3 inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                  In Stock
                </span>
              ) : (
                <span className="ml-3 inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                  Out of Stock
                </span>
              )}
            </div>
            {product.price && (
              <p className="mt-6 text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
            )}
            {product.sku && (
              <p className="mt-2 text-sm text-gray-500">SKU: {product.sku}</p>
            )}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-base text-gray-500">{product.description}</p>
            </div>
            <div className="mt-10 flex space-x-4">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to Quote
              </button>
              <Link
                href="/contact"
                className="rounded-md border border-blue-600 px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Contact for Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Related Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <div className="h-64 w-full bg-gray-200 relative">
                      {relatedProduct.imageUrl ? (
                        <Image
                          src={relatedProduct.imageUrl}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover object-center"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-500">
                          No image available
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={`/products/${relatedProduct.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {relatedProduct.name}
                        </Link>
                      </h3>
                    </div>
                    {relatedProduct.price && (
                      <p className="text-sm font-medium text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
