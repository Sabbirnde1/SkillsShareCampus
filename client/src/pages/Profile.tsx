import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/ServiceCard";
import { RatingStars } from "@/components/RatingStars";
import { EmptyState } from "@/components/EmptyState";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Separator } from "@/components/ui/separator";
import { formatDateRelative } from "@/lib/utils";
import { Loader2, Edit, MapPin, School, Award, Briefcase, MessageCircle, Users2, PlusCircle } from "lucide-react";
import { Link } from "wouter";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const { user, isAuthenticated } = useAuth();
  const isOwnProfile = !userId || (isAuthenticated && user?.id === userId);
  
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: [isOwnProfile ? "/api/auth/user" : `/api/users/${userId}`],
    enabled: isAuthenticated || !!userId,
  });

  const { data: userServices = [], isLoading: servicesLoading } = useQuery({
    queryKey: [isOwnProfile ? "/api/services/my-services" : `/api/users/${userId}/services`],
    enabled: isAuthenticated || !!userId,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: [isOwnProfile ? "/api/reviews/received" : `/api/users/${userId}/reviews`],
    enabled: isAuthenticated || !!userId,
  });

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const profile = profileData || {
    id: "1",
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@mit.edu",
    profileImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    school: "MIT",
    major: "Computer Science",
    graduationYear: "2024",
    bio: "Senior Computer Science student at MIT with a passion for web development and teaching. I've interned at Google and Facebook, and I love helping others learn to code.",
    skills: ["React.js", "Node.js", "JavaScript", "Python", "Teaching", "Database Design"],
    rating: 4.9,
    reviewCount: 56,
    completedServices: 48,
    joinedDate: "2023-01-15T14:30:00Z",
  };

  // Simulated reviews data
  const reviewsData = reviews.length ? reviews : [
    {
      id: 1,
      user: {
        id: "2",
        name: "Julia Martinez",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      serviceTitle: "Web Development Tutoring",
      rating: 5,
      comment: "Alex was extremely helpful and patient. He helped me build my first React app from scratch and explained concepts in a way that was easy to understand.",
      createdAt: "2023-05-10T09:15:00Z"
    },
    {
      id: 2,
      user: {
        id: "3",
        name: "Ryan Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
      serviceTitle: "Web Development Tutoring",
      rating: 5,
      comment: "Great tutor! I was struggling with Node.js and backend development, but after just a few sessions I feel so much more confident. Would definitely book again.",
      createdAt: "2023-05-02T16:45:00Z"
    },
  ];

  const servicesData = userServices.length ? userServices : [
    {
      id: 1,
      title: "Web Development Tutoring",
      description: "I'll help you learn React.js, Node.js and build your portfolio projects from scratch.",
      price: 25,
      priceType: "hour",
      category: "coding",
      rating: 4.9,
      reviewCount: 56,
      image: "https://pixabay.com/get/gbdba7f5d7c105e6da38000e3144c885ef40932fb7c36369734e9bcf97ac490251836d0cd01587804c98bd800325801b27ba68bd8c7a7de761a16df4774c3f2d4_1280.jpg",
      provider: {
        id: profile.id,
        name: `${profile.firstName} ${profile.lastName}`,
        avatar: profile.profileImageUrl,
        school: profile.school,
        major: profile.major,
      },
    }
  ];

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={profile.profileImageUrl}
                    alt={fullName}
                  />
                  <AvatarFallback>{profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">{fullName}</h2>
                <p className="text-gray-500">{profile.email}</p>
                <div className="flex items-center mt-2">
                  <RatingStars rating={profile.rating} size="sm" />
                  <span className="ml-2 text-sm text-gray-600">
                    {profile.rating} ({profile.reviewCount} reviews)
                  </span>
                </div>
                {isOwnProfile ? (
                  <Button asChild className="mt-4 w-full">
                    <Link href="/profile/edit">
                      <a className="flex items-center justify-center">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </a>
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="mt-4 w-full">
                    <Link href={`/messages/${profile.id}`}>
                      <a className="flex items-center justify-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message
                      </a>
                    </Link>
                  </Button>
                )}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-500">Cambridge, MA</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <School className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900">Education</p>
                    <p className="text-gray-500">
                      {profile.major}, {profile.school} ({profile.graduationYear})
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900">Services Completed</p>
                    <p className="text-gray-500">{profile.completedServices}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users2 className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900">Member Since</p>
                    <p className="text-gray-500">{formatDateRelative(profile.joinedDate)}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{profile.bio}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="services">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="services">Services Offered</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              {servicesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : servicesData.length === 0 ? (
                <EmptyState
                  icon={PlusCircle}
                  title="No services yet"
                  description={isOwnProfile ? "Start sharing your skills with other students on campus!" : "This user hasn't created any services yet."}
                  actionText={isOwnProfile ? "Create a Service" : undefined}
                  actionLink={isOwnProfile ? "/create-service" : undefined}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {servicesData.map((service) => (
                    <ServiceCard
                      key={service.id}
                      {...service}
                      actionText="View Details"
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : reviewsData.length === 0 ? (
                <EmptyState
                  icon={Award}
                  title="No reviews yet"
                  description="Reviews will appear here after completing services."
                />
              ) : (
                <div className="space-y-6">
                  {reviewsData.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={review.user.avatar} 
                                alt={review.user.name} 
                              />
                              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <CardTitle className="text-base font-medium">{review.user.name}</CardTitle>
                              <CardDescription>{formatDateRelative(review.createdAt)}</CardDescription>
                            </div>
                          </div>
                          <RatingStars rating={review.rating} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">For service: </span>
                          <span className="font-medium">{review.serviceTitle}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
