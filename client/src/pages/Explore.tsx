import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarIcon } from "@/assets/icons";
import { Loader2 } from "lucide-react";

interface Service {
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
    id: number;
    name: string;
    avatar: string;
    school: string;
    major: string;
  };
}

const Explore = () => {
  const [location, setLocation] = useLocation();
  const parsedUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(parsedUrl.search);
  const categoryParam = searchParams.get("category");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("recommended");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["/api/services", selectedCategory, selectedPrice, selectedSort, searchTerm],
  });

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "coding", label: "Coding" },
    { id: "design", label: "Design" },
    { id: "tutoring", label: "Tutoring" },
    { id: "languages", label: "Languages" },
    { id: "video", label: "Video" },
    { id: "music", label: "Music" },
  ];

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "free", label: "Free" },
    { id: "under25", label: "Under $25" },
    { id: "25to50", label: "$25 to $50" },
    { id: "50to100", label: "$50 to $100" },
    { id: "over100", label: "Over $100" },
  ];

  const sortOptions = [
    { id: "recommended", label: "Recommended" },
    { id: "newest", label: "Newest" },
    { id: "priceLow", label: "Price: Low to High" },
    { id: "priceHigh", label: "Price: High to Low" },
    { id: "rating", label: "Highest Rated" },
  ];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedPrice !== "all") params.set("price", selectedPrice);
    if (selectedSort !== "recommended") params.set("sort", selectedSort);
    if (searchTerm) params.set("q", searchTerm);
    
    const queryString = params.toString();
    setLocation(`/explore${queryString ? `?${queryString}` : ''}`, { replace: true });
  }, [selectedCategory, selectedPrice, selectedSort, searchTerm, setLocation]);

  // Get category badge style
  const getCategoryStyle = (category: string) => {
    const styles = {
      coding: "bg-blue-100 text-blue-800",
      design: "bg-pink-100 text-pink-800",
      tutoring: "bg-green-100 text-green-800",
      languages: "bg-purple-100 text-purple-800",
      video: "bg-orange-100 text-orange-800",
      music: "bg-indigo-100 text-indigo-800",
    };
    return styles[category as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Explore Services</h1>
        <div className="mt-4 md:mt-0">
          <Link href="/create-service">
            <Button className="flex items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create a Service
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger>
              <SelectValue placeholder="Price range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Service Cards */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <img
                className="h-48 w-full object-cover"
                src="https://pixabay.com/get/gbdba7f5d7c105e6da38000e3144c885ef40932fb7c36369734e9bcf97ac490251836d0cd01587804c98bd800325801b27ba68bd8c7a7de761a16df4774c3f2d4_1280.jpg"
                alt="Programming tutoring service"
              />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Coding
                  </span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">4.9 (56)</span>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">
                  Web Development Tutoring
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  I'll help you learn React.js, Node.js and build your portfolio projects from scratch.
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                    alt="Provider profile"
                  />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">Alex Chen</p>
                    <p className="text-xs text-gray-500">Computer Science, MIT</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">$25</span>
                    <span className="text-sm text-gray-500">/hour</span>
                  </div>
                  <Link href={`/service/1`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350"
                alt="Graphic design service"
              />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full">
                    Design
                  </span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">4.8 (42)</span>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">
                  Custom Logo & Brand Design
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  Professional logo design, branding kits, and social media assets for your student org
                  or startup.
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                    alt="Provider profile"
                  />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">Maya Johnson</p>
                    <p className="text-xs text-gray-500">Graphic Design, RISD</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">$45</span>
                    <span className="text-sm text-gray-500">/project</span>
                  </div>
                  <Link href={`/service/2`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350"
                alt="Math tutoring service"
              />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Tutoring
                  </span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">5.0 (29)</span>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">
                  Calculus & Statistics Tutoring
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  Expert help with calculus, statistics, and probability. I can help with assignments
                  and exam prep.
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                    alt="Provider profile"
                  />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">David Kim</p>
                    <p className="text-xs text-gray-500">Mathematics, Stanford</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">$30</span>
                    <span className="text-sm text-gray-500">/hour</span>
                  </div>
                  <Link href={`/service/3`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350"
                alt="Video editing service"
              />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    Video
                  </span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">4.7 (38)</span>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">
                  Video Editing & Production
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  Professional video editing for your YouTube channel, course projects, or social media
                  content.
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                    alt="Provider profile"
                  />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">Jared Wilson</p>
                    <p className="text-xs text-gray-500">Film Studies, NYU</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">$55</span>
                    <span className="text-sm text-gray-500">/project</span>
                  </div>
                  <Link href={`/service/4`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <Button variant="outline" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
