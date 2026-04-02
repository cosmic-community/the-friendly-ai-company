import { getMetafieldValue } from '@/lib/cosmic';
import type { ProductCategory } from '@/types';

interface CategoryBadgeProps {
  category: ProductCategory;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryBadge({ category, isActive = false, onClick }: CategoryBadgeProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const emoji = getMetafieldValue(category.metadata?.emoji_icon) || '📦';

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-sunshine-400 text-gray-900 shadow-friendly'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-sunshine-300 hover:bg-sunshine-50'
      }`}
    >
      <span>{emoji}</span>
      {name}
    </button>
  );
}