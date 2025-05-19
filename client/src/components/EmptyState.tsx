import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        {description}
      </p>
      {(actionText && actionLink) || onAction ? (
        <div className="mt-6">
          {onAction ? (
            <Button onClick={onAction}>{actionText}</Button>
          ) : (
            <Button asChild>
              <Link href={actionLink!}>
                <a>{actionText}</a>
              </Link>
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};
