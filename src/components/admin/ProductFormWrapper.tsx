"use client";

import { useRouter } from "next/navigation";
import ProductForm from "./ProductForm";

interface ProductFormWrapperProps {
  initialData: {
    name: string;
    slug: string;
    description: string;
    price: string;
    sku: string;
    imageUrl: string;
    inStock: boolean;
    featured: boolean;
    featuredOrder: string;
    categoryId: string;
  };
  productId: string;
}

export default function ProductFormWrapper({ initialData, productId }: ProductFormWrapperProps) {
  const router = useRouter();
  
  return <ProductForm initialData={initialData} productId={productId} />;
}
