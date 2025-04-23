"use client";

import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Product</h1>
      <p className="mt-2 text-sm text-gray-600">
        Create a new product in your catalog.
      </p>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
