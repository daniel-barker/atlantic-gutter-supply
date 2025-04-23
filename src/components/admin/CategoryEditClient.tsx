"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  products?: Product[];
}

export default function CategoryEditClient() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch(`/api/categories/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to load category. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchCategory();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => router.push("/admin/categories")}
                className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                Go back to categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Category not found</h3>
        <p className="mt-1 text-sm text-gray-500">The category you are looking for does not exist or has been removed.</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Go back to categories
          </button>
        </div>
      </div>
    );
  }

  const formData = {
    name: category.name,
    slug: category.slug,
    description: category.description || "",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Category</h1>
      <p className="mt-2 text-sm text-gray-600">
        Update category information in your catalog.
      </p>
      <div className="mt-8">
        <CategoryForm initialData={formData} categoryId={id} />
      </div>
    </div>
  );
}
