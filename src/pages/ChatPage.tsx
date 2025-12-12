// src/pages/ChatPage.tsx
import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Sparkles, Plus, MessageSquare, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { sendChatMessage, getConversations, getConversation, type ChatMessage, type ConversationSummary } from "@/lib/api";

function abs(path: string) {
  const base = "https://www.projectjuno.ai";
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

function Canonical({ href }: { href: string }) {
  return <link rel="canonical" href={href} />;
}

export default function ChatPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>();
  const [conversationNumber, setConversationNumber] = useState<number | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to chat with Juno");
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  // Load conversations on mount
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Scroll to bottom when input is focused on mobile
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleFocus = () => {
      // Small delay to allow keyboard to appear
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    };

    input.addEventListener("focus", handleFocus);
    return () => input.removeEventListener("focus", handleFocus);
  }, []);

  const loadConversations = async () => {
    if (!user) return;
    
    setLoadingConversations(true);
    try {
      const response = await getConversations();
      setConversations(response.conversations || []);
    } catch (error: any) {
      console.error("Failed to load conversations:", error);
      // Don't show toast for this, it's not critical
    } finally {
      setLoadingConversations(false);
    }
  };

  const startNewConversation = async () => {
    if (!user || isLoading) return;

    // Clear current conversation
    setMessages([]);
    setThreadId(undefined);
    setConversationNumber(null);
    setIsLoading(true);

    try {
      // Send empty messages array to trigger Juno's first message
      const response = await sendChatMessage([], undefined);
      
      // Update thread ID and conversation number
      if (response.meta.threadId) {
        setThreadId(response.meta.threadId);
      }
      if (response.meta.conversationNumber) {
        setConversationNumber(response.meta.conversationNumber);
      }

      // Add Juno's first message
      setMessages([
        {
          role: "assistant",
          content: response.assistant_message,
        },
      ]);

      // Reload conversations to show the new one
      await loadConversations();
    } catch (error: any) {
      console.error("Failed to start conversation:", error);
      toast.error(error.message || "Failed to start conversation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversationHistory = async (convNumber: number, threadIdParam?: string) => {
    if (!user || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getConversation(convNumber);
      const conversation = response.conversation;
      
      setMessages(conversation.messages || []);
      setThreadId(conversation.thread_id || threadIdParam);
      setConversationNumber(convNumber);
      
      // Reload conversations to highlight active one
      await loadConversations();
    } catch (error: any) {
      console.error("Failed to load conversation:", error);
      toast.error(error.message || "Failed to load conversation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() || isLoading || !user) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    // Add user message immediately
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(newMessages, threadId);
      
      // Update thread ID and conversation number if we got them
      if (response.meta.threadId) {
        setThreadId(response.meta.threadId);
      }
      if (response.meta.conversationNumber) {
        setConversationNumber(response.meta.conversationNumber);
      }

      // Add assistant response
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: response.assistant_message,
        },
      ]);

      // Reload conversations to update message counts
      await loadConversations();
    } catch (error: any) {
      console.error("Chat error:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
      // Remove the user message on error
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </main>
      </>
    );
  }

  // Don't render chat if not authenticated
  if (!user) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  return (
    <>
      <title>Chat with Juno — Project Juno</title>
      <meta
        name="description"
        content="Chat with Juno, your AI companion for meaningful connections."
      />
      <Canonical href={abs("/chat")} />
      <meta name="robots" content="noindex,nofollow" />

      <Header />

      <main className="min-h-screen flex" style={{ height: "calc(100vh - 3.5rem)" }}>
        {/* Sidebar - Conversation History */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } border-r bg-muted/30 transition-all duration-200 overflow-hidden flex flex-col`}
        >
          <div className="p-3 border-b">
            <Button
              onClick={startNewConversation}
              disabled={isLoading}
              className="w-full justify-start gap-2"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {loadingConversations ? (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No conversations yet</p>
                  <p className="text-xs mt-1">Start a new chat to begin</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {conversations.map((conv) => (
                    <button
                      key={conv.conversation_number}
                      onClick={() => loadConversationHistory(conv.conversation_number, conv.thread_id)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                        conversationNumber === conv.conversation_number
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="font-medium truncate mb-1">
                        {conv.preview || `Conversation #${conv.conversation_number}`}
                      </div>
                      <div className={`text-xs ${
                        conversationNumber === conv.conversation_number
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}>
                        {formatDate(conv.last_message_at)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-2 border-t">
            <Button
              onClick={loadConversations}
              disabled={loadingConversations}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loadingConversations ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
          {/* Top Bar */}
          <div className="border-b p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-muted">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Juno</h1>
                  <p className="text-xs text-muted-foreground">AI Companion</p>
                </div>
              </div>
            </div>
            {messages.length === 0 && (
              <Button
                onClick={startNewConversation}
                disabled={isLoading}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Start Conversation
              </Button>
            )}
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 pb-24 md:pb-0">
            <div className="max-w-3xl mx-auto w-full p-4 md:p-6 pb-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border bg-muted mb-4">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Start a conversation with Juno</h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Juno is here to get to know you—really know you—so we can help find someone
                    who truly fits you.
                  </p>
                  <Button
                    onClick={startNewConversation}
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        New Conversation
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="shrink-0">
                          <div className="h-8 w-8 rounded-full border bg-muted flex items-center justify-center">
                            <Sparkles className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <div className="shrink-0">
                          <div className="h-8 w-8 rounded-full border bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                            {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 justify-start">
                      <div className="shrink-0">
                        <div className="h-8 w-8 rounded-full border bg-muted flex items-center justify-center">
                          <Sparkles className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Juno is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area - Fixed on mobile, relative on desktop */}
          <div 
            className="border-t p-4 shrink-0 bg-background md:relative fixed bottom-0 z-50 md:z-auto shadow-lg md:shadow-none backdrop-blur-sm bg-background/95 md:bg-background"
            style={{ 
              paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
            }}
          >
            <form onSubmit={handleSend} className="max-w-3xl mx-auto w-full px-4 md:px-0">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading || messages.length === 0}
                  className="flex-1 text-base md:text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading || messages.length === 0}
                  size="icon"
                  className="shrink-0"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
