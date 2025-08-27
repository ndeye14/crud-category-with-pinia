import type { Category } from "@/stores/useCategoryStore";

export const formatItem = (item: any): Category => {
  if (!item ) {
    throw new Error("Invalid item format");
  }

  return {
    id: item.id,
    name: item.name || "Untitled",
    description: item.description || "Untitled",
    created_at: item.created_at || "Untitled",
    updated_at: item.updated_at || "Untitled",
  };
};

export const formatCategoryData = (response: any): Category[] => {
  const dataArray = response.data;

  if (!Array.isArray(dataArray)) {
    throw new Error("Invalid response format");
  }

  return dataArray.map(formatItem);
};
export function formatCategoryData(data: any[]): Category[] {
  return data.data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
}

