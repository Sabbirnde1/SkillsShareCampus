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
  const { user, isAuthenticated } = useAuth();
  const { data: featuredServices = [] } = useQuery({
    queryKey: ["/api/services/featured"],
  });

  const [activeTab, setActiveTab] = useState("all");

  const features = [
    {
      id: 1,
      title: "Verified Students Only",
      description: "Campus-exclusive marketplace limited to students with .edu emails",
      icon: <VerifiedIcon className="h-12 w-12 text-primary" />,
    },
    {
      id: 2,
      title: "Ratings & Reviews",
      description: "Quality service delivery with peer ratings and detailed feedback",
      icon: <StarIcon className="h-12 w-12 text-primary" />,
    },
    {
      id: 3,
      title: "Exchange Services",
      description: "Swap skills instead of money - tutor in exchange for design help",
      icon: <ExchangeIcon className="h-12 w-12 text-primary" />,
    },
    {
      id: 4,
      title: "Campus Storefronts",
      description: "Find services specific to your university, from your peers",
      icon: <StoreIcon className="h-12 w-12 text-primary" />,
    },
  ];

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
      quote: "SkillShare Campus helped me earn $500 last semester just by offering design help to other students in my dorm!",
      author: "Alex K.",
      role: "Graphic Design Major",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 2,
      quote: "I needed urgent calculus tutoring before midterms and found three qualified tutors within my budget in just minutes.",
      author: "Jason M.",
      role: "Engineering Student",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 3,
      quote: "Being able to trade services let me get professional headshots for my LinkedIn without spending money - I just offered Python lessons in exchange!",
      author: "Sarah T.",
      role: "Computer Science Major",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="relative">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
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
                          <Link href="/create-service">
                            <Button className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10">
                              Create a Service
                            </Button>
                          </Link>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <Link href="/explore">
                            <Button variant="outline" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10">
                              Browse Services
                            </Button>
                          </Link>
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
                          <Link href="/explore">
                            <Button variant="outline" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10">
                              Browse Services
                            </Button>
                          </Link>
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
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="Students collaborating"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              What Makes Us Different
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to monetize your skills
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              SkillShare Campus is built exclusively for college students, focusing on micro-services that
              fit around your class schedule.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.id} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 border border-gray-100 shadow-sm">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary to-secondary rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Browse by Category
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === category.id
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Will be populated with services from the database */}
            {featuredServices.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Be the first to offer your skills on campus! Create a service listing and start earning.
                </p>
                <div className="mt-6">
                  <Link href="/create-service">
                    <Button className="mx-auto">Create a Service</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

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
        {/* Add featured services cards here */}
      </div>

      {/* Campus Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Popular Campuses</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Join thousands of students offering and finding services at top universities.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {campuses.map((campus) => (
              <div
                key={campus.id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="flex-1 flex flex-col p-2">
                  <div
                    className="w-full h-32 bg-cover bg-center rounded-t-lg"
                    style={{ backgroundImage: `url(${campus.imgUrl})` }}
                  ></div>
                  <h3 className="mt-2 text-gray-900 text-sm font-medium">{campus.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Students Are Saying
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Real experiences from students on campus.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.avatar}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4 flex">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start earning?</span>
            <span className="block text-indigo-100">Create your service today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button asChild className="bg-white text-primary hover:bg-gray-100">
                <a
                  href={isAuthenticated ? "/create-service" : "/api/login"}
                  className="flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;