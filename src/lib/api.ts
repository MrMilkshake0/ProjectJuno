// src/lib/api.ts
import { auth } from "./firebase";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000/api";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  assistant_message: string;
  reply: string;
  meta: {
    model: string;
    latency: { reply: number; total: number };
    threadId: string;
    conversationNumber: number;
    user_id: string;
    contextMessages?: any[];
    userProfile?: any;
    llmCalls?: any;
  };
}

export interface ConversationSummary {
  conversation_number: number;
  thread_id?: string;
  started_at?: string;
  last_message_at?: string;
  message_count: number;
  preview: string;
}

export interface ConversationsResponse {
  user_id: string;
  conversations: ConversationSummary[];
}

export interface ConversationHistory {
  conversation_number: number;
  thread_id?: string;
  started_at?: string;
  last_message_at?: string;
  message_count?: number;
  messages: ChatMessage[];
  metadata?: {
    topics_discussed?: string[];
    mood_detected?: string;
    key_moments?: string[];
    key_insights?: string[];
  };
}

export interface ConversationResponse {
  user_id: string;
  conversation: ConversationHistory;
}

export interface AdaptiveUpdateResponse {
  success: boolean;
  message?: string;
  conversationCount?: number;
  unstructuredInfo?: any;
  junoPersonalitySystem?: any;
  error?: string;
}

export interface QuestionnaireResponse {
  ok: boolean;
  id?: string;
  error?: string;
  details?: string;
  meta?: {
    latency: number;
    user_id: string;
  };
}

export interface ProfileResponse {
  ok: boolean;
  profile?: any;
  error?: string;
  details?: string;
}

/**
 * Get the current Firebase Auth ID token.
 */
async function getAuthToken(): Promise<string | null> {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }
    return await user.getIdToken();
  } catch (error) {
    console.error("[api] Failed to get auth token:", error);
    return null;
  }
}

/**
 * Make an authenticated API request.
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error("Not authenticated. Please sign in first.");
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.details || error.error || `API request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Send a chat message to Juno.
 */
export async function sendChatMessage(
  messages: ChatMessage[],
  threadId?: string
): Promise<ChatResponse> {
  return apiRequest<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify({
      messages,
      threadId,
    }),
  });
}

/**
 * Get all conversations for the current user.
 */
export async function getConversations(): Promise<ConversationsResponse> {
  return apiRequest<ConversationsResponse>("/conversations");
}

/**
 * Get a specific conversation by number.
 */
export async function getConversation(
  conversationNumber: number
): Promise<ConversationResponse> {
  return apiRequest<ConversationResponse>(`/conversations/${conversationNumber}`);
}

/**
 * Trigger an adaptive update for the current user.
 */
export async function triggerAdaptiveUpdate(): Promise<AdaptiveUpdateResponse> {
  return apiRequest<AdaptiveUpdateResponse>("/adaptive-update", {
    method: "POST",
  });
}

/**
 * Save questionnaire data to backend.
 */
export async function saveQuestionnaire(
  payload: unknown
): Promise<QuestionnaireResponse> {
  return apiRequest<QuestionnaireResponse>("/profile/questionnaire", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Get current user's profile from backend.
 */
export async function getUserProfile(): Promise<ProfileResponse> {
  return apiRequest<ProfileResponse>("/profile");
}

