import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/CategoryBadge";
import { RatingStars } from "@/components/RatingStars";
import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  priceType: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  provider: {
    id: number | string;
    name: string;
    avatar: string;
    school: string;
    major: string;
  };
  actionText?: string;
  linkTo?: string;
  onAction?: () => void;
}

export const ServiceCard = ({
  id,
  title,
  description,
  price,
  priceType,
  category,
  rating,
  reviewCount,
  image,
  provider,
  actionText = "Book Now",
  linkTo,
  onAction,
}: ServiceCardProps) => {
  const displayLink = linkTo || `/service/${id}`;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-48 w-full relative">
        <Link href={displayLink}>
          <a className="block h-full">
            <img
              className="h-full w-full object-cover"
              src={image}
              alt={title}
            />
          </a>
        </Link>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <CategoryBadge category={category} />
          <div className="flex items-center">
            <RatingStars rating={rating} />
            <span className="text-sm text-gray-600 ml-1">
              {rating} ({reviewCount})
            </span>
          </div>
        </div>
        <Link href={displayLink}>
          <a className="block mt-3">
            <h3 className="text-lg font-semibold text-gray-900 truncate hover:underline">
              {title}
            </h3>
          </a>
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={provider.avatar} alt={provider.name} />
            <AvatarFallback>{provider.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-900">{provider.name}</p>
            <p className="text-xs text-gray-500">
              {provider.major}, {provider.school}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(price)}
            </span>
            <span className="text-sm text-gray-500">/{priceType}</span>
          </div>
          {onAction ? (
            <Button size="sm" onClick={onAction}>
              {actionText}
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href={displayLink}>
                <a>{actionText}</a>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
