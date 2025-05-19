import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send } from "lucide-react";

type Message = {
  id: number;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  receiver: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
};

type Conversation = {
  id: number;
  user: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
  };
  unreadCount: number;
};

const Messages = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const { data: conversations = [], isLoading: conversationsLoading } = useQuery({
    queryKey: ["/api/conversations"],
    enabled: isAuthenticated,
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/messages", selectedConversation],
    enabled: isAuthenticated && selectedConversation !== null,
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation) return;

    // Send message logic here
    setMessageInput("");
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
          Please sign in with your .edu email to access your messages.
        </p>
        <div className="mt-8">
          <Button asChild>
            <a href="/api/login">Sign in with .edu</a>
          </Button>
        </div>
      </div>
    );
  }

  // Sample data for demo
  const sampleConversations: Conversation[] = [
    {
      id: 1,
      user: {
        id: "1",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
        isOnline: true,
      },
      lastMessage: {
        content: "Sure, I can help you with React. When do you want to meet?",
        timestamp: "2023-05-12T14:30:00Z",
        isRead: false,
      },
      unreadCount: 2,
    },
    {
      id: 2,
      user: {
        id: "2",
        name: "Maya Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        isOnline: false,
      },
      lastMessage: {
        content: "Your logo design is ready! I've sent the files.",
        timestamp: "2023-05-10T09:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
  ];

  const sampleMessages: Message[] = [
    {
      id: 1,
      sender: {
        id: "user1",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      },
      receiver: {
        id: user?.id || "",
        name: user?.firstName || "You",
        avatar: user?.profileImageUrl || "",
      },
      content: "Hi there! I saw you're looking for help with React.js?",
      timestamp: "2023-05-12T13:45:00Z",
      isRead: true,
    },
    {
      id: 2,
      sender: {
        id: user?.id || "",
        name: user?.firstName || "You",
        avatar: user?.profileImageUrl || "",
      },
      receiver: {
        id: "user1",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      },
      content: "Yes! I'm working on a project and I'm stuck with some hooks concepts.",
      timestamp: "2023-05-12T13:50:00Z",
      isRead: true,
    },
    {
      id: 3,
      sender: {
        id: "user1",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      },
      receiver: {
        id: user?.id || "",
        name: user?.firstName || "You",
        avatar: user?.profileImageUrl || "",
      },
      content: "I'd be happy to help! What specific hooks are you having trouble with?",
      timestamp: "2023-05-12T13:55:00Z",
      isRead: true,
    },
    {
      id: 4,
      sender: {
        id: user?.id || "",
        name: user?.firstName || "You",
        avatar: user?.profileImageUrl || "",
      },
      receiver: {
        id: "user1",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      },
      content: "Mainly useEffect and useContext. Would you be available for a tutoring session this week?",
      timestamp: "2023-05-12T14:00:00Z",
      isRead: true,
    },
    {
      id: 5,
      sender: {
        id: "user1",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      },
      receiver: {
        id: user?.id || "",
        name: user?.firstName || "You",
        avatar: user?.profileImageUrl || "",
      },
      content: "Sure, I can help you with React. When do you want to meet?",
      timestamp: "2023-05-12T14:30:00Z",
      isRead: false,
    },
  ];

  // Format timestamp for display
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatConversationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[70vh]">
        {/* Conversation list */}
        <div className="border-r md:col-span-1 lg:col-span-1">
          <div className="p-4 border-b">
            <Input 
              placeholder="Search conversations..." 
              className="w-full"
            />
          </div>

          <ScrollArea className="h-[calc(70vh-4rem)]">
            {conversationsLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : sampleConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations yet
              </div>
            ) : (
              <div>
                {sampleConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedConversation === conversation.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage 
                            src={`${conversation.user.avatar}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                            alt={conversation.user.name}
                          />
                          <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                        </Avatar>
                        {conversation.user.isOnline && (
                          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">{conversation.user.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatConversationTime(conversation.lastMessage.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className={`text-sm truncate ${
                            conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                          }`}>
                            {conversation.lastMessage.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-xs font-medium text-white">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Message content */}
        <div className="md:col-span-2 lg:col-span-3 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat header */}
              <div className="border-b p-4 flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={`${sampleConversations.find(c => c.id === selectedConversation)?.user.avatar}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                    alt={sampleConversations.find(c => c.id === selectedConversation)?.user.name}
                  />
                  <AvatarFallback>
                    {sampleConversations.find(c => c.id === selectedConversation)?.user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">
                    {sampleConversations.find(c => c.id === selectedConversation)?.user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {sampleConversations.find(c => c.id === selectedConversation)?.user.isOnline ? 
                      'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4 h-[calc(70vh-8rem-4rem)]">
                {messagesLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sampleMessages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${
                          message.sender.id === user?.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div className={`flex ${
                          message.sender.id === user?.id ? 'flex-row-reverse' : 'flex-row'
                        } max-w-[80%]`}>
                          {message.sender.id !== user?.id && (
                            <Avatar className="h-8 w-8 mt-1 mx-2 flex-shrink-0">
                              <AvatarImage
                                src={`${message.sender.avatar}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                                alt={message.sender.name}
                              />
                              <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div className={`rounded-lg p-3 ${
                              message.sender.id === user?.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <p>{message.content}</p>
                            </div>
                            <p className={`text-xs text-gray-500 mt-1 ${
                              message.sender.id === user?.id ? 'text-right' : ''
                            }`}>
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Message input */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 mr-2"
                  />
                  <Button type="submit" disabled={!messageInput.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Your Messages</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md">
                Select a conversation or start a new one with a service provider to discuss details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
