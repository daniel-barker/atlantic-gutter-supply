import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

async function getProducts(categorySlug?: string) {
  const where = categorySlug ? {
    category: {
      slug: categorySlug
    }
  } : {};
  
  return prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  // In Next.js 15, searchParams is a Promise that needs to be awaited
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams?.category || '';
  const [categories, products] = await Promise.all([getCategories(), getProducts(categorySlug)]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        <p className="mt-4 max-w-xl text-base text-gray-500">
          Browse our complete selection of high-quality gutter supplies for your next project.
        </p>

        <div className="mt-12 lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Filter sidebar */}
          <div className="hidden lg:block">
            <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <Link 
                  href="/products" 
                  className={`hover:text-blue-600 ${!categorySlug ? 'text-gray-900 font-medium' : 'text-gray-600'}`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/products?category=${category.slug}`} 
                    className={`hover:text-blue-600 ${categorySlug === category.slug ? 'text-gray-900 font-medium' : 'text-gray-600'}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product grid */}
          <div className="mt-6 lg:col-span-3 lg:mt-0">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <div className="h-64 w-full bg-gray-200 relative">
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
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={`/products/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                    </div>
                    {product.price && (
                      <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
