"use client";

import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Category</h1>
      <p className="mt-2 text-sm text-gray-600">
        Create a new product category for your catalog.
      </p>
      <div className="mt-8">
        <CategoryForm />
      </div>
    </div>
  );
}
