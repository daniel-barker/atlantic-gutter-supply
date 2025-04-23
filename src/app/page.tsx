import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 4,
    include: {
      category: true,
    },
  });
  return products;
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-blue-800 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-background.jpg"
            alt="Gutter installation"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Gutter Supplies for Contractors & Homeowners
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-blue-100">
            Competitive pricing, unmatched service, fast delivery.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              href="/products"
              className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-800 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Shop Products
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white bg-transparent px-6 py-3 text-lg font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Talk to a Rep
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Icon Row */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Material</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Appearance</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Functionality</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Installation</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Products</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              Browse our selection of high-quality gutter supplies
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
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
                <div className="p-4">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                    {product.category.name}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    {product.price ? (
                      <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    ) : (
                      <p className="text-sm italic text-gray-500">Contact for pricing</p>
                    )}
                    <Link
                      href={`/products/${product.slug}`}
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why AGS? Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Atlantic Gutter Supply?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              Your trusted partner since 1984
            </p>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <p className="text-lg text-gray-600">
                Since 1984, we've grown from a small Hudson Valley supplier to covering 5 states (NY, NJ, CT, PA, MA), while remaining a family-owned business committed to quality products and exceptional service.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Our commitment to being a true partner with our customers has never changed. We offer a comprehensive selection of gutters, downspouts, and accessories in 20 colors of Aluminum, Copper, Galvanized, Galvalume and Lead Coated Copper.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Fast Delivery</h3>
                    <p className="mt-1 text-gray-600">Our fleet of trucks delivers to all areas weekly, with on-site gutter roll-out services available.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Huge Inventory</h3>
                    <p className="mt-1 text-gray-600">We maintain a large stock of materials, ensuring everything is available when you need it.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Fair Prices</h3>
                    <p className="mt-1 text-gray-600">Competitive pricing with bulk discounts that can't be beat, without sacrificing quality.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Real People</h3>
                    <p className="mt-1 text-gray-600">Our knowledgeable team provides expert advice to help you select the right products for your needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 overflow-hidden rounded-lg">
              <Image
                src="/images/storefront.jpg"
                alt="Atlantic Gutter Supply delivery van and storefront"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Material Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Material Information</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              Everything you need to know about our gutter materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Material Selection</h3>
              </div>
              <p className="text-gray-600">
                Gutters, gutter guards, snow shoes, snow rails, heat cables, etc. These are important choices in the appearance & functionality of any gutter system.
              </p>
              <Link href="/products" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
                Browse materials <span className="ml-1" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Appearance</h3>
              </div>
              <p className="text-gray-600">
                We have multiple styles of gutters to compliment and enhance the look of any home or building. Our products come in 20 colors of Aluminum, Copper, Galvanized, and more.
              </p>
              <Link href="/products" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
                View styles <span className="ml-1" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Functionality</h3>
              </div>
              <p className="text-gray-600">
                The main job of a gutter is to move water. We can help ensure the right materials are chosen for your job, with options for various sizes and configurations.
              </p>
              <Link href="/contact" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
                Get advice <span className="ml-1" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Installation Knowledge</h3>
              </div>
              <p className="text-gray-600">
                Need help with a tricky installation or just starting out? We can help get you the answers you need with our decades of industry experience.
              </p>
              <Link href="/contact" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
                Ask our experts <span className="ml-1" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-700 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Need help with a project?</h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-blue-100">
            We're here to help with each and every project, from simple to complex!
          </p>
          
          <div className="mt-10 grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Where to find us</h3>
              <p className="text-blue-100">
                19 Commerce St.<br />
                Poughkeepsie, NY 12603
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Call or Text us</h3>
              <p className="text-blue-100 mb-1">Monday to Friday, 7:00 – 3:30</p>
              <p className="text-blue-100">Call: 1.845.454.4795 or 1.800.732.3091</p>
              <p className="text-blue-100">Text: 1.845.419.8499</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Email us</h3>
              <p className="text-blue-100">Send your questions to:</p>
              <a href="mailto:atlanticguttersupply@gmail.com" className="text-white hover:text-blue-200">atlanticguttersupply@gmail.com</a>
            </div>
          </div>
          
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-800 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Us Today
            </Link>
          </div>
          <p className="mt-10 text-2xl font-bold text-white">"Quality, Service & Value"</p>
        </div>
      </section>
    </>
  );
}
