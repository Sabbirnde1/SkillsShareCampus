import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryBadge } from "@/components/CategoryBadge";
import { RatingStars } from "@/components/RatingStars";
import { formatCurrency, formatDateRelative } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckIcon, StarIcon } from "@/assets/icons";
import { Loader2, MapPin, Clock, Calendar as CalendarIcon, MessageCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const ServiceDetail = () => {
  const params = useParams();
  const serviceId = params.id;
  const { user, isAuthenticated } = useAuth();
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingLocation, setBookingLocation] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [bookingType, setBookingType] = useState<"paid" | "exchange">("paid");
  const [exchangeService, setExchangeService] = useState<string>("");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: service, isLoading } = useQuery({
    queryKey: [`/api/services/${serviceId}`],
    enabled: !!serviceId,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: [`/api/services/${serviceId}/reviews`],
    enabled: !!serviceId,
  });

  const handleBookService = async () => {
    if (!bookingDate || !bookingTime || !bookingLocation) return;

    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/bookings", {
        serviceId,
        date: bookingDate,
        time: bookingTime,
        location: bookingLocation,
        notes: bookingNotes,
        type: bookingType,
        exchangeService: bookingType === "exchange" ? exchangeService : null,
      });

      setBookingDialogOpen(false);
      // Reset form
      setBookingDate(undefined);
      setBookingTime("");
      setBookingLocation("");
      setBookingNotes("");
      setBookingType("paid");
      setExchangeService("");
    } catch (error) {
      console.error("Error booking service:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Simulated service data for the UI while backend integration is pending
  const serviceData = service || {
    id: serviceId,
    title: "Web Development Tutoring",
    description: "I'll help you learn React.js, Node.js and build your portfolio projects from scratch. Whether you're a complete beginner or looking to level up your skills, I can create a customized learning plan for you. We can focus on frontend, backend, or full-stack development.",
    longDescription: `
      <p>I'm a Computer Science senior at MIT with 3+ years of professional web development experience. I've worked with startups and large companies, and I currently maintain several open-source projects.</p>
      <p>My teaching approach is hands-on. We'll work on real projects while learning the fundamentals. By the end of our sessions, you'll have production-quality code you can add to your portfolio.</p>
      <h3>What I can help with:</h3>
      <ul>
        <li>JavaScript fundamentals and modern ES6+ features</li>
        <li>React.js basics to advanced concepts (hooks, context, state management)</li>
        <li>Node.js and Express backend development</li>
        <li>Database integration (SQL or NoSQL)</li>
        <li>Authentication, API design, and deployment</li>
        <li>Interview preparation and coding challenges</li>
      </ul>
    `,
    price: 25,
    priceType: "hour",
    category: "coding",
    rating: 4.9,
    reviewCount: 56,
    image: "https://pixabay.com/get/gbdba7f5d7c105e6da38000e3144c885ef40932fb7c36369734e9bcf97ac490251836d0cd01587804c98bd800325801b27ba68bd8c7a7de761a16df4774c3f2d4_1280.jpg",
    provider: {
      id: 1,
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      school: "MIT",
      major: "Computer Science",
      bio: "Senior Computer Science student at MIT with a passion for web development and teaching. I've interned at Google and Facebook, and I love helping others learn to code.",
      rating: 4.9,
      completedServices: 48,
    },
    availableTimes: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"],
    acceptsExchange: true,
    createdAt: "2023-04-10T14:30:00Z",
  };

  // Simulated reviews data
  const reviewsData = reviews.length ? reviews : [
    {
      id: 1,
      user: {
        id: 2,
        name: "Julia Martinez",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      rating: 5,
      comment: "Alex was extremely helpful and patient. He helped me build my first React app from scratch and explained concepts in a way that was easy to understand.",
      createdAt: "2023-05-10T09:15:00Z"
    },
    {
      id: 2,
      user: {
        id: 3,
        name: "Ryan Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
      rating: 5,
      comment: "Great tutor! I was struggling with Node.js and backend development, but after just a few sessions I feel so much more confident. Would definitely book again.",
      createdAt: "2023-05-02T16:45:00Z"
    },
    {
      id: 3,
      user: {
        id: 4,
        name: "Sarah Lee",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      },
      rating: 4,
      comment: "Very knowledgeable about React and frontend development. Helped me debug a complex issue with my project. The only reason for 4 stars is that we ran out of time before covering everything I wanted to learn.",
      createdAt: "2023-04-28T13:20:00Z"
    }
  ];

  const isServiceProvider = isAuthenticated && user?.id === serviceData.provider.id;

  const timeOptions = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={serviceData.image}
              alt={serviceData.title}
              className="w-full h-96 object-cover"
            />

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <CategoryBadge category={serviceData.category} size="md" />
                <div className="flex items-center ml-auto">
                  <RatingStars rating={serviceData.rating} size="md" />
                  <span className="ml-2 text-gray-600">
                    {serviceData.rating} ({serviceData.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{serviceData.title}</h1>
              
              <p className="text-lg text-gray-600 mb-6">{serviceData.description}</p>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="provider">Provider</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="py-4">
                  <div className="prose prose-blue max-w-none" 
                    dangerouslySetInnerHTML={{ __html: serviceData.longDescription }}>
                  </div>

                  {serviceData.acceptsExchange && (
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-blue-800">Skill Exchange Available</h3>
                          <p className="mt-1 text-sm text-blue-600">
                            This provider accepts skill exchanges. You can offer your own services in return instead of paying.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="provider" className="py-4">
                  <div className="flex items-center mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={`${serviceData.provider.avatar}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                        alt={serviceData.provider.name}
                      />
                      <AvatarFallback>{serviceData.provider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">{serviceData.provider.name}</h3>
                      <p className="text-gray-600">
                        {serviceData.provider.major}, {serviceData.provider.school}
                      </p>
                      <div className="flex items-center mt-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-gray-600">
                          {serviceData.provider.rating} · {serviceData.provider.completedServices} services completed
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{serviceData.provider.bio}</p>
                  
                  <div className="flex space-x-4">
                    <Button asChild variant="outline">
                      <Link href={`/messages/${serviceData.provider.id}`}>
                        <a className="flex items-center">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </a>
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/profile/${serviceData.provider.id}`}>
                        <a>View Full Profile</a>
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="py-4">
                  <div className="space-y-6">
                    {reviewsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : reviewsData.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No reviews yet for this service.
                      </div>
                    ) : (
                      reviewsData.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={`${review.user.avatar}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                                alt={review.user.name} 
                              />
                              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <p className="text-base font-medium text-gray-900">{review.user.name}</p>
                              <div className="flex items-center">
                                <RatingStars rating={review.rating} />
                                <span className="ml-2 text-sm text-gray-500">
                                  {formatDateRelative(review.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-gray-600">{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(serviceData.price)}
                <span className="text-base font-normal text-gray-500">/{serviceData.priceType}</span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Created {formatDateRelative(serviceData.createdAt)}
              </p>
            </div>
            
            <Separator className="my-4" />
            
            {!isAuthenticated ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Sign in with your .edu email to book this service</p>
                <Button asChild className="w-full">
                  <a href="/api/login">Sign in with .edu</a>
                </Button>
              </div>
            ) : isServiceProvider ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">This is your own service listing</p>
                <Button asChild className="w-full">
                  <Link href={`/service/${serviceId}/edit`}>
                    <a>Edit Service</a>
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Book Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book {serviceData.title}</DialogTitle>
                      <DialogDescription>
                        Complete the form below to book this service
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="booking-type">Booking Type</Label>
                          <Select
                            value={bookingType}
                            onValueChange={(value) => setBookingType(value as "paid" | "exchange")}
                          >
                            <SelectTrigger id="booking-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">Paid Service</SelectItem>
                              {serviceData.acceptsExchange && (
                                <SelectItem value="exchange">Skill Exchange</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {bookingType === "exchange" && (
                          <div className="col-span-2">
                            <Label htmlFor="exchange-service">What service can you offer in exchange?</Label>
                            <Textarea
                              id="exchange-service"
                              value={exchangeService}
                              onChange={(e) => setExchangeService(e.target.value)}
                              placeholder="Describe the skill or service you can offer in return"
                            />
                          </div>
                        )}
                        
                        <div className="col-span-2">
                          <Label>Select Date</Label>
                          <div className="border rounded-md p-2 mt-1">
                            <Calendar
                              mode="single"
                              selected={bookingDate}
                              onSelect={setBookingDate}
                              className="mx-auto"
                              disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                            />
                          </div>
                        </div>
                        
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="booking-time">Select Time</Label>
                          <Select
                            value={bookingTime}
                            onValueChange={setBookingTime}
                          >
                            <SelectTrigger id="booking-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="booking-location">Location</Label>
                          <Select
                            value={bookingLocation}
                            onValueChange={setBookingLocation}
                          >
                            <SelectTrigger id="booking-location">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="library">University Library</SelectItem>
                              <SelectItem value="student-center">Student Center</SelectItem>
                              <SelectItem value="coffee-shop">Campus Coffee Shop</SelectItem>
                              <SelectItem value="online">Online (Zoom)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2">
                          <Label htmlFor="booking-notes">Additional Notes</Label>
                          <Textarea
                            id="booking-notes"
                            value={bookingNotes}
                            onChange={(e) => setBookingNotes(e.target.value)}
                            placeholder="Any specific requirements or topics you want to cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={handleBookService}
                        disabled={!bookingDate || !bookingTime || !bookingLocation || submitting}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : bookingType === "exchange" ? (
                          "Request Exchange"
                        ) : (
                          <>Confirm Booking ({formatCurrency(serviceData.price)})</>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="space-y-4 mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/messages/${serviceData.provider.id}`}>
                      <a className="flex items-center justify-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message Provider
                      </a>
                    </Link>
                  </Button>
                </div>
              </>
            )}
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">
                  Typically responds within 24 hours
                </span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">
                  Available times: {serviceData.availableTimes?.join(", ")}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">
                  On-campus or online sessions available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
