import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

const timeOptions = [
  { id: "morning", label: "Morning (8AM - 12PM)" },
  { id: "afternoon", label: "Afternoon (12PM - 5PM)" },
  { id: "evening", label: "Evening (5PM - 10PM)" },
];

const createServiceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title can't exceed 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description can't exceed 500 characters"),
  detailedDescription: z.string().min(50, "Detailed description must be at least 50 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  priceType: z.string().min(1, "Please select a price type"),
  image: z.string().url("Please provide a valid image URL"),
  availableTimes: z.array(z.string()).min(1, "Select at least one available time"),
  acceptsExchange: z.boolean().default(false),
  exchangeDetails: z.string().optional(),
  location: z.array(z.string()).min(1, "Select at least one location option"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type CreateServiceFormValues = z.infer<typeof createServiceSchema>;

const CreateService = () => {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      title: "",
      description: "",
      detailedDescription: "",
      category: "",
      price: 0,
      priceType: "hour",
      image: "https://pixabay.com/get/gbdba7f5d7c105e6da38000e3144c885ef40932fb7c36369734e9bcf97ac490251836d0cd01587804c98bd800325801b27ba68bd8c7a7de761a16df4774c3f2d4_1280.jpg",
      availableTimes: [],
      acceptsExchange: false,
      exchangeDetails: "",
      location: [],
      termsAccepted: false,
    },
  });

  async function onSubmit(data: CreateServiceFormValues) {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a service",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/services", data);
      toast({
        title: "Service created!",
        description: "Your service has been successfully created.",
      });
      setLocation("/my-gigs");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">You need to sign in first</h2>
        <p className="mt-4 text-lg text-gray-500">
          Please sign in with your .edu email to create a service.
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a Service</h1>
      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Web Development Tutoring" {...field} />
                        </FormControl>
                        <FormDescription>
                          Clearly describe what service you're offering
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief overview of your service"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will appear in service cards (max 500 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="detailedDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide detailed information about what you offer, your qualifications, and what students can expect"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Be specific about what's included in your service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="coding">Coding</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="tutoring">Tutoring</SelectItem>
                          <SelectItem value="languages">Languages</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="writing">Writing</SelectItem>
                          <SelectItem value="photography">Photography</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the most relevant category for your service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Per</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select price type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hour">Hour</SelectItem>
                            <SelectItem value="session">Session</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a URL for your service image" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL to an image that represents your service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="availableTimes"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Available Times</FormLabel>
                          <FormDescription>
                            Select when you're typically available to provide this service
                          </FormDescription>
                        </div>
                        <div className="space-y-2">
                          {timeOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="availableTimes"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Location Options</FormLabel>
                          <FormDescription>
                            Where can you provide this service?
                          </FormDescription>
                        </div>
                        <div className="space-y-2">
                          {[
                            { id: "in-person", label: "In-person (on campus)" },
                            { id: "online", label: "Online (virtual)" },
                            { id: "flexible", label: "Flexible (both options available)" },
                          ].map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="location"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="acceptsExchange"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Skill Exchange</FormLabel>
                          <FormDescription>
                            Accept other skills or services as payment instead of money
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("acceptsExchange") && (
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="exchangeDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exchange Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What skills or services would you be interested in receiving in exchange?"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Specify what types of skills you'd be willing to accept as exchange
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the Terms of Service and Community Guidelines
                          </FormLabel>
                          <FormDescription>
                            Your service must comply with our community standards and terms of use
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => setLocation("/my-gigs")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Service"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateService;
