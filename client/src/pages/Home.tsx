import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CodeIcon,
  BrushIcon,
  BookIcon,
  TranslateIcon,
  VideoIcon,
  MusicIcon,
  StarIcon,
  VerifiedIcon,
  StoreIcon,
  ExchangeIcon,
  CheckIcon,
} from "@/assets/icons";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: featuredServices = [] } = useQuery({
    queryKey: ["/api/services/featured"],
    enabled: true,
  });

  const categories = [
    { id: "all", label: "All", icon: null },
    { id: "coding", label: "Coding", icon: <CodeIcon className="mr-1 h-4 w-4" /> },
    { id: "design", label: "Design", icon: <BrushIcon className="mr-1 h-4 w-4" /> },
    { id: "tutoring", label: "Tutoring", icon: <BookIcon className="mr-1 h-4 w-4" /> },
    { id: "languages", label: "Languages", icon: <TranslateIcon className="mr-1 h-4 w-4" /> },
    { id: "video", label: "Video", icon: <VideoIcon className="mr-1 h-4 w-4" /> },
    { id: "music", label: "Music", icon: <MusicIcon className="mr-1 h-4 w-4" /> },
  ];

  const campuses = [
    { id: 1, name: "MIT", imgUrl: "https://images.unsplash.com/photo-1562774053-701939374585" },
    { id: 2, name: "Harvard", imgUrl: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54" },
    { id: 3, name: "UCLA", imgUrl: "https://pixabay.com/get/g78b7b8d45dc2f2b9b3aef8792588ef8f7c97f9fce9abfae158c3d641feb886f5a9636f2aed317ea733f9c85e11e4259eeaeda3ef0fb50477af3b59a76583627e_1280.jpg" },
    { id: 4, name: "Stanford", imgUrl: "https://images.unsplash.com/photo-1581362072978-14998d01fdaa" },
    { id: 5, name: "NYU", imgUrl: "https://pixabay.com/get/g78b7b8d45dc2f2b9b3aef8792588ef8f7c97f9fce9abfae158c3d641feb886f5a9636f2aed317ea733f9c85e11e4259eeaeda3ef0fb50477af3b59a76583627e_1280.jpg" },
    { id: 6, name: "UC Berkeley", imgUrl: "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sophia Lee",
      school: "UPenn, Class of 2023",
      avatar: "https://images.unsplash.com/photo-1558203728-00f45181dd84",
      content:
        "I've been able to fund my coffee addiction by tutoring calculus twice a week. The platform makes it so easy to find students who need help!",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      school: "UCLA, Class of 2024",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      content:
        "As a film student, I've been able to build my portfolio by creating videos for campus organizations. I've even landed an internship through a connection I made!",
    },
    {
      id: 3,
      name: "Ava Rodriguez",
      school: "Michigan State, Class of 2022",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      content:
        "I traded my Spanish lessons for help with my website design. Skill exchange is such a brilliant idea for broke college students like me!",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Turn your skills into</span>
                  <span className="block text-primary">campus income</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  The exclusive marketplace for students to offer services, collaborate, and build
                  real portfolios. Get verified with your .edu email today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {isAuthenticated ? (
                    <>
                      <div className="rounded-md shadow">
                        <Button asChild className="w-full">
                          <Link href="/create-service">
                            <a className="flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10">
                              Create a Service
                            </a>
                          </Link>
                        </Button>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Button asChild variant="outline">
                          <Link href="/explore">
                            <a className="flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10">
                              Browse Services
                            </a>
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-md shadow">
                        <Button asChild className="w-full">
                          <a
                            href="/api/login"
                            className="flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10"
                          >
                            Get Started
                          </a>
                        </Button>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Button asChild variant="outline">
                          <Link href="/explore">
                            <a className="flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10">
                              Browse Services
                            </a>
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&h=700"
            alt="Students collaborating on campus"
          />
        </div>
      </section>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
          <Link href="/explore">
            <a className="hidden text-sm font-semibold text-primary hover:text-primary-600 sm:block">
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center sm:justify-start overflow-x-auto py-2 space-x-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`${
                    activeCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } px-6 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap flex items-center`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
            <Link href="/explore">
              <a className="block text-sm font-semibold text-primary hover:text-primary-600 mt-5 sm:hidden">
                Browse all categories<span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Services</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Service Card 1 */}
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
                <Button size="sm">Book Now</Button>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
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
                <Button size="sm">Book Now</Button>
              </div>
            </div>
          </div>

          {/* Service Card 3 */}
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
                <Button size="sm">Book Now</Button>
              </div>
            </div>
          </div>

          {/* Service Card 4 */}
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
                <Button size="sm">Book Now</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/explore">
            <a className="inline-flex items-center px-4 py-2 border border-primary/30 text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50">
              View all services{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How SkillShare Campus Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500 text-lg">
              Simple, secure, and made specifically for students like you
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-5">
                <VerifiedIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Campus Verification</h3>
              <p className="mt-4 text-gray-500">
                Sign up with your .edu email to join your campus marketplace. All users are verified
                students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-full mb-5">
                <StoreIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">List or Find Services</h3>
              <p className="mt-4 text-gray-500">
                Create listings for skills you can offer, or browse services from talented peers on
                your campus.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-full mb-5">
                <ExchangeIcon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Secure Payments</h3>
              <p className="mt-4 text-gray-500">
                Pay securely through our platform or choose skill-exchange mode to trade services
                with peers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Exchange Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Skill Exchange Mode</h2>
            <p className="mt-4 text-lg text-gray-500">
              Not everything needs to be about money. Trade your skills with other students in a
              collaborative exchange.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex">
                <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="ml-3 text-gray-500">Trade your Python tutoring for graphic design help</p>
              </li>
              <li className="flex">
                <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="ml-3 text-gray-500">Earn exchange credits to use for other services</p>
              </li>
              <li className="flex">
                <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="ml-3 text-gray-500">
                  Build your campus network through collaborative projects
                </p>
              </li>
              <li className="flex">
                <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="ml-3 text-gray-500">Track your exchanges with our built-in system</p>
              </li>
            </ul>
            <div className="mt-10">
              <Button asChild>
                <Link href="/explore?type=exchange">
                  <a>Explore Skill Exchange</a>
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <img
              className="rounded-xl shadow-lg"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450"
              alt="Students exchanging skills and knowledge"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">What Students Are Saying</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500 text-lg">
              Hear from students who've transformed their campus experience with SkillShare Campus
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={`${testimonial.avatar}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                    alt={`${testimonial.name} testimonial`}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.school}</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-gray-500">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campuses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Join These Campus Communities</h2>
        <p className="mt-4 text-lg text-gray-500 text-center max-w-3xl mx-auto">
          We're rapidly expanding to campuses across the country. Check if your school is already on
          SkillShare Campus!
        </p>

        <div className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {campuses.map((campus) => (
            <div key={campus.id} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden shadow-sm mb-2">
                <img
                  src={`${campus.imgUrl}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                  alt={`${campus.name} campus`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-900">{campus.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button>Check if your campus is available</Button>
          <p className="mt-4 text-sm text-gray-500">
            Don't see your school?{" "}
            <Link href="/request-campus">
              <a className="text-primary font-medium">Request to add your campus</a>
            </Link>
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to monetize your skills?</h2>
          <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
            Join thousands of students who are already earning, learning, and building their
            portfolios.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" className="bg-white text-primary">
              <a href="/api/login">Sign up with your .edu email</a>
            </Button>
            <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white border border-primary-300">
              <Link href="/explore">
                <a>Explore Services</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
