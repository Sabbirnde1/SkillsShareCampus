import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateRelative(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHr / 24);

  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  } else if (diffHr < 24) {
    return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getInitials(name: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getCategoryColor(category: string): { bg: string; text: string } {
  const colors = {
    coding: { bg: 'bg-blue-100', text: 'text-blue-800' },
    design: { bg: 'bg-pink-100', text: 'text-pink-800' },
    tutoring: { bg: 'bg-green-100', text: 'text-green-800' },
    languages: { bg: 'bg-purple-100', text: 'text-purple-800' },
    video: { bg: 'bg-orange-100', text: 'text-orange-800' },
    music: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    writing: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    photography: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    marketing: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    other: { bg: 'bg-gray-100', text: 'text-gray-800' },
  };

  return colors[category as keyof typeof colors] || colors.other;
}

export function getServiceStatusColor(status: string): { bg: string; text: string } {
  const colors = {
    active: { bg: 'bg-green-100', text: 'text-green-800' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    completed: { bg: 'bg-blue-100', text: 'text-blue-800' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
  };

  return colors[status as keyof typeof colors] || { bg: 'bg-gray-100', text: 'text-gray-800' };
}
