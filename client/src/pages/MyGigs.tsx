import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "@/assets/icons";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, PlusCircle, Edit, Trash2, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const MyGigs = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

  const { data: servicesOffered = [], isLoading: offeredLoading } = useQuery({
    queryKey: ["/api/services/my-services"],
    enabled: isAuthenticated,
  });

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  const handleDeleteClick = (id: number) => {
    setServiceToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    // Delete logic here
    setDeleteConfirmOpen(false);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">You need to sign in first</h2>
        <p className="mt-4 text-lg text-gray-500">
          Please sign in with your .edu email to access your gigs.
        </p>
        <div className="mt-8">
          <Button asChild>
            <a href="/api/login">Sign in with .edu</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Gigs</h1>
        <div className="mt-4 sm:mt-0">
          <Button asChild>
            <Link href="/create-service">
              <a className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Service
              </a>
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="services">Services I Offer</TabsTrigger>
            <TabsTrigger value="booked">Services I've Booked</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            {offeredLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : servicesOffered.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <PlusCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No services yet</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  You haven't created any services yet. Start sharing your skills with other students
                  on campus!
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/create-service">
                      <a>Offer a Service</a>
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example service card */}
                <Card>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src="https://pixabay.com/get/gbdba7f5d7c105e6da38000e3144c885ef40932fb7c36369734e9bcf97ac490251836d0cd01587804c98bd800325801b27ba68bd8c7a7de761a16df4774c3f2d4_1280.jpg"
                      alt="Web Development Tutoring"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                      Coding
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Web Development Tutoring</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>4.9 (56 reviews)</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-gray-500 line-clamp-2">
                      I'll help you learn React.js, Node.js and build your portfolio projects from
                      scratch.
                    </p>
                    <div className="mt-3 flex justify-between items-baseline">
                      <p className="font-bold">
                        $25 <span className="text-sm font-normal text-gray-500">/hour</span>
                      </p>
                      <p className="text-sm text-gray-500">4 active bookings</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/service/1/edit">
                        <a className="flex items-center">
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </a>
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(1)}
                      className="flex items-center"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="booked">
            {bookingsLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No bookings yet</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  You haven't booked any services yet. Explore available services from talented
                  students on your campus!
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/explore">
                      <a>Explore Services</a>
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Example booking card */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>Calculus & Statistics Tutoring</CardTitle>
                        <CardDescription>with David Kim</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Confirmed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date & Time</p>
                        <p className="font-medium">May 15, 2023 • 3:00 PM</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="font-medium">University Library, Study Room 4</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p className="font-medium">$30.00 (1 hour)</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/messages/1">
                        <a>Message Provider</a>
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel Booking
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Delete Service
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone and will
              cancel all pending bookings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Yes, Delete Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyGigs;
