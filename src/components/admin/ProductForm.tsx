"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  sku: string;
  imageUrl: string;
  inStock: boolean;
  categoryId: string;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
}

export default function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductFormData>({
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
      price: "",
      sku: "",
      imageUrl: "",
      inStock: true,
      categoryId: "",
    },
  });

  // Watch the name field to generate slug
  const name = watch("name");

  useEffect(() => {
    // Fetch categories
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again.");
      }
    }

    fetchCategories();
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (name && !initialData) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [name, setValue, initialData]);

  // Set preview image if initialData has an imageUrl
  useEffect(() => {
    if (initialData?.imageUrl) {
      setPreviewImage(initialData.imageUrl);
    }
  }, [initialData]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    // Start upload
    setIsUploading(true);
    setUploadProgress(0);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const data = await response.json();
      setValue("imageUrl", data.filePath);
      setUploadProgress(100);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(error instanceof Error ? error.message : "Failed to upload image");
      // Reset preview on error
      setPreviewImage("");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const url = productId
        ? `/api/products/${productId}`
        : "/api/products";

      const method = productId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error saving product:", error);
      setError(error instanceof Error ? error.message : "Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Product Name *
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              placeholder="Enter product name"
              {...register("name", { required: "Product name is required" })}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
            Slug *
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="slug"
              placeholder="product-url-slug"
              {...register("slug", { required: "Slug is required" })}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.slug && (
              <p className="mt-2 text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Price
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="price"
              placeholder="19.99"
              {...register("price")}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">
            SKU
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="sku"
              placeholder="SKU12345"
              {...register("sku")}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="categoryId" className="block text-sm font-medium leading-6 text-gray-900">
            Category *
          </label>
          <div className="mt-2">
            <select
              id="categoryId"
              {...register("categoryId", { required: "Category is required" })}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-2 text-sm text-red-600">{errors.categoryId.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="inStock" className="block text-sm font-medium leading-6 text-gray-900">
            Stock Status
          </label>
          <div className="mt-2">
            <select
              id="inStock"
              {...register("inStock", { 
                setValueAs: (value) => value === "true" ? true : false
              })}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Product Image
          </label>
          <div className="mt-2 flex flex-col space-y-4">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
            />

            {/* Image URL field (hidden but still part of the form) */}
            <input
              type="hidden"
              id="imageUrl"
              {...register("imageUrl")}
            />

            {/* Image preview */}
            <div className="flex items-center space-x-4">
              <div className="relative h-32 w-32 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Product preview"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </button>
                {watch("imageUrl") && (
                  <p className="text-xs text-gray-500 truncate max-w-xs">{watch("imageUrl")}</p>
                )}
              </div>
            </div>

            {/* Upload progress */}
            {isUploading && (
              <div className="w-full">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              rows={4}
              placeholder="Enter product description here..."
              {...register("description")}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-x-3">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
