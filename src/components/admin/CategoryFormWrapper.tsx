"use client";

import { useRouter } from "next/navigation";
import CategoryForm from "./CategoryForm";

interface CategoryFormWrapperProps {
  initialData: {
    name: string;
    slug: string;
    description: string;
  };
  categoryId: string;
}

export default function CategoryFormWrapper({ initialData, categoryId }: CategoryFormWrapperProps) {
  const router = useRouter();
  
  return <CategoryForm initialData={initialData} categoryId={categoryId} />;
}
