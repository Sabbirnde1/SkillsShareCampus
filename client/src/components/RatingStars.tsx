import { StarIcon } from "@/assets/icons";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showEmpty?: boolean;
}

export const RatingStars = ({ 
  rating, 
  size = "sm", 
  showEmpty = false 
}: RatingStarsProps) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const starSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className={`${starSize[size]} text-yellow-400`} />
      ))}
      
      {hasHalfStar && (
        <div className="relative">
          <StarIcon className={`${starSize[size]} text-gray-200`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIcon className={`${starSize[size]} text-yellow-400`} />
          </div>
        </div>
      )}

      {showEmpty && [...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <StarIcon key={`empty-${i}`} className={`${starSize[size]} text-gray-200`} />
      ))}
    </div>
  );
};
