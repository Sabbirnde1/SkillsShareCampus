import {
  users,
  type User,
  type UpsertUser,
  services,
  type Service,
  type InsertService,
  reviews,
  type Review,
  type InsertReview,
  bookings,
  type Booking,
  type InsertBooking,
  conversations,
  type Conversation,
  type InsertConversation,
  messages,
  type Message,
  type InsertMessage
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Service operations
  getServices(category?: string): Promise<Service[]>;
  getFeaturedServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getUserServices(userId: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;
  
  // Review operations
  getServiceReviews(serviceId: number): Promise<Review[]>;
  getUserReceivedReviews(userId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Booking operations
  getBooking(id: number): Promise<Booking | undefined>;
  getUserBookings(userId: string): Promise<Booking[]>;
  getServiceBookings(serviceId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking>;
  hasUserBookedService(userId: string, serviceId: number): Promise<boolean>;
  
  // Conversation and message operations
  getUserConversations(userId: string): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  createConversation(participantIds: string[]): Promise<Conversation>;
  getConversationMessages(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<number, Service>;
  private reviews: Map<number, Review>;
  private bookings: Map<number, Booking>;
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  
  private serviceIdCounter: number;
  private reviewIdCounter: number;
  private bookingIdCounter: number;
  private conversationIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.reviews = new Map();
    this.bookings = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    
    this.serviceIdCounter = 1;
    this.reviewIdCounter = 1;
    this.bookingIdCounter = 1;
    this.conversationIdCounter = 1;
    this.messageIdCounter = 1;
    
    // Add some initial data for development
    this.addInitialData();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id);
    
    const user: User = {
      ...userData,
      createdAt: existingUser?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.users.set(user.id, user);
    return user;
  }

  // Service operations
  async getServices(category?: string): Promise<Service[]> {
    let services = Array.from(this.services.values());
    
    if (category && category !== 'all') {
      services = services.filter(service => service.category === category);
    }
    
    return services;
  }

  async getFeaturedServices(): Promise<Service[]> {
    const services = Array.from(this.services.values());
    // Sort by rating and pick top 4
    return services
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getUserServices(userId: string): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(service => service.providerId === userId);
  }

  async createService(serviceData: InsertService): Promise<Service> {
    const id = this.serviceIdCounter++;
    
    const service: Service = {
      id,
      ...serviceData,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, serviceData: Partial<InsertService>): Promise<Service> {
    const existingService = this.services.get(id);
    if (!existingService) {
      throw new Error(`Service with ID ${id} not found`);
    }
    
    const updatedService: Service = {
      ...existingService,
      ...serviceData,
      updatedAt: new Date().toISOString(),
    };
    
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<void> {
    this.services.delete(id);
    
    // Delete associated reviews and bookings
    for (const [reviewId, review] of this.reviews.entries()) {
      if (review.serviceId === id) {
        this.reviews.delete(reviewId);
      }
    }
    
    for (const [bookingId, booking] of this.bookings.entries()) {
      if (booking.serviceId === id) {
        this.bookings.delete(bookingId);
      }
    }
  }

  // Review operations
  async getServiceReviews(serviceId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.serviceId === serviceId);
  }

  async getUserReceivedReviews(userId: string): Promise<Review[]> {
    // Find all services provided by this user
    const userServices = await this.getUserServices(userId);
    const userServiceIds = userServices.map(service => service.id);
    
    // Find all reviews for these services
    return Array.from(this.reviews.values())
      .filter(review => userServiceIds.includes(review.serviceId));
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    
    const review: Review = {
      id,
      ...reviewData,
      createdAt: new Date().toISOString(),
    };
    
    this.reviews.set(id, review);
    
    // Update service rating
    const service = this.services.get(reviewData.serviceId);
    if (service) {
      const serviceReviews = await this.getServiceReviews(service.id);
      const totalRating = serviceReviews.reduce((sum, review) => sum + review.rating, 0);
      const newRating = totalRating / serviceReviews.length;
      
      await this.updateService(service.id, {
        rating: parseFloat(newRating.toFixed(1)),
        reviewCount: serviceReviews.length,
      });
    }
    
    return review;
  }

  // Booking operations
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.userId === userId);
  }

  async getServiceBookings(serviceId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.serviceId === serviceId);
  }

  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    
    const booking: Booking = {
      id,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking> {
    const booking = this.bookings.get(id);
    if (!booking) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    
    const updatedBooking: Booking = {
      ...booking,
      status,
      updatedAt: new Date().toISOString(),
    };
    
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async hasUserBookedService(userId: string, serviceId: number): Promise<boolean> {
    const userBookings = await this.getUserBookings(userId);
    return userBookings.some(booking => 
      booking.serviceId === serviceId && 
      ['confirmed', 'completed'].includes(booking.status)
    );
  }

  // Conversation and message operations
  async getUserConversations(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conversation => conversation.participantIds.includes(userId));
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(participantIds: string[]): Promise<Conversation> {
    // Check if conversation already exists between these users
    const existingConversation = Array.from(this.conversations.values())
      .find(conversation => {
        const participants = conversation.participantIds;
        return participants.length === participantIds.length &&
          participants.every(id => participantIds.includes(id));
      });
    
    if (existingConversation) {
      return existingConversation;
    }
    
    const id = this.conversationIdCounter++;
    
    const conversation: Conversation = {
      id,
      participantIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversationMessages(conversationId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    
    const message: Message = {
      id,
      ...messageData,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    
    this.messages.set(id, message);
    
    // Update conversation timestamp
    const conversation = this.conversations.get(messageData.conversationId);
    if (conversation) {
      conversation.updatedAt = new Date().toISOString();
      this.conversations.set(conversation.id, conversation);
    }
    
    return message;
  }

  private addInitialData() {
    // Sample users, services, reviews, etc. can be added here for development
  }
}

export const storage = new MemStorage();
