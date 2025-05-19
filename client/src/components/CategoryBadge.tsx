import { getCategoryColor } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md";
}

export const CategoryBadge = ({ category, size = "sm" }: CategoryBadgeProps) => {
  const { bg, text } = getCategoryColor(category);
  const sizeClasses = size === "sm" 
    ? "px-2 py-1 text-xs" 
    : "px-3 py-1.5 text-sm";

  return (
    <span className={`${sizeClasses} font-medium ${bg} ${text} rounded-full`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
};
