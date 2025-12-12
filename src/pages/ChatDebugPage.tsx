// src/pages/ChatDebugPage.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Bug, 
  User, 
  MessageSquare, 
  RefreshCw, 
  Database, 
  Brain, 
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  Copy,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getConversations, 
  getConversation, 
  triggerAdaptiveUpdate,
  type ConversationSummary 
} from "@/lib/api";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

interface ApiLog {
  timestamp: string;
  endpoint: string;
  method: string;
  status: "success" | "error" | "pending";
  response?: any;
  error?: string;
  duration?: number;
}

export default function ChatDebugPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // State
  const [userProfile, setUserProfile] = useState<any>(null);
  const [narrativeProfile, setNarrativeProfile] = useState<any>(null);
  const [junoPersonality, setJunoPersonality] = useState<any>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    profile: true,
    narrative: false,
    personality: false,
    conversations: true,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to access debug page");
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  // Load all data on mount
  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user]);

  const addApiLog = (log: ApiLog) => {
    setApiLogs((prev) => [log, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  const logApiCall = async <T,>(
    name: string,
    endpoint: string,
    method: string,
    fn: () => Promise<T>
  ): Promise<T> => {
    const startTime = Date.now();
    const log: ApiLog = {
      timestamp: new Date().toISOString(),
      endpoint,
      method,
      status: "pending",
    };
    addApiLog(log);

    setLoading((prev) => ({ ...prev, [name]: true }));

    try {
      const response = await fn();
      const duration = Date.now() - startTime;
      addApiLog({
        ...log,
        status: "success",
        response: response,
        duration,
      });
      setLoading((prev) => ({ ...prev, [name]: false }));
      return response;
    } catch (error: any) {
      const duration = Date.now() - startTime;
      addApiLog({
        ...log,
        status: "error",
        error: error.message || String(error),
        duration,
      });
      setLoading((prev) => ({ ...prev, [name]: false }));
      throw error;
    }
  };

  const loadAllData = async () => {
    if (!user?.uid) return;

    try {
      await Promise.all([
        loadUserProfile(),
        loadNarrativeProfile(),
        loadJunoPersonality(),
        loadConversationsList(),
      ]);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const loadUserProfile = async () => {
    if (!user?.uid) return;
    
    await logApiCall("profile", "/users/{uid}", "GET", async () => {
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        setUserProfile(profileSnap.data());
        return profileSnap.data();
      } else {
        setUserProfile(null);
        return null;
      }
    });
  };

  const loadNarrativeProfile = async () => {
    if (!user?.uid) return;
    
    await logApiCall("narrative", "/users/{uid}/narrativeProfile/data", "GET", async () => {
      const narrativeRef = doc(db, "users", user.uid, "narrativeProfile", "data");
      const narrativeSnap = await getDoc(narrativeRef);
      
      if (narrativeSnap.exists()) {
        setNarrativeProfile(narrativeSnap.data());
        return narrativeSnap.data();
      } else {
        setNarrativeProfile(null);
        return null;
      }
    });
  };

  const loadJunoPersonality = async () => {
    if (!user?.uid) return;
    
    await logApiCall("personality", "/users/{uid}/junoPersonality", "GET", async () => {
      const personalityCol = collection(db, "users", user.uid, "junoPersonality");
      const snapshot = await getDocs(personalityCol);
      
      const personalityData: Record<string, any> = {};
      snapshot.docs.forEach((doc) => {
        personalityData[doc.id] = doc.data();
      });
      
      if (Object.keys(personalityData).length > 0) {
        setJunoPersonality(personalityData);
        return personalityData;
      } else {
        setJunoPersonality(null);
        return null;
      }
    });
  };

  const loadConversationsList = async () => {
    await logApiCall("conversations", "/conversations", "GET", async () => {
      const response = await getConversations();
      setConversations(response.conversations || []);
      return response;
    });
  };

  const loadConversation = async (conversationNumber: number) => {
    await logApiCall(
      `conversation-${conversationNumber}`,
      `/conversations/${conversationNumber}`,
      "GET",
      async () => {
        const response = await getConversation(conversationNumber);
        setSelectedConversation(response.conversation);
        return response;
      }
    );
  };

  const handleAdaptiveUpdate = async () => {
    await logApiCall("adaptive-update", "/adaptive-update", "POST", async () => {
      const response = await triggerAdaptiveUpdate();
      
      if (response.success) {
        toast.success(`Adaptive update completed! Analyzed ${response.conversationCount} conversation(s).`);
        // Reload data after update
        await Promise.all([
          loadNarrativeProfile(),
          loadJunoPersonality(),
        ]);
      } else {
        throw new Error(response.error || "Adaptive update failed");
      }
      
      return response;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderJson = (data: any) => {
    if (!data) return <p className="text-muted-foreground text-sm">No data</p>;
    return (
      <pre className="text-xs bg-muted p-4 rounded-md overflow-auto max-h-96">
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <Bug className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Chat Debug Panel</h1>
            <p className="text-muted-foreground">Comprehensive testing and debugging interface</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile Data</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="api-logs">API Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">UID</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono">{user.uid}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(user.uid)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm">{user.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Display Name</p>
                    <p className="text-sm">{user.displayName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Auth Provider</p>
                    <p className="text-sm">{user.providerData[0]?.providerId || "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common debugging operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={loadAllData}
                    disabled={loading.profile || loading.narrative || loading.personality}
                    variant="outline"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading.profile ? "animate-spin" : ""}`} />
                    Reload All Data
                  </Button>
                  <Button
                    onClick={handleAdaptiveUpdate}
                    disabled={loading["adaptive-update"]}
                    variant="outline"
                  >
                    <Brain className={`h-4 w-4 mr-2 ${loading["adaptive-update"] ? "animate-spin" : ""}`} />
                    Trigger Adaptive Update
                  </Button>
                  <Button
                    onClick={loadConversationsList}
                    disabled={loading.conversations}
                    variant="outline"
                  >
                    <MessageSquare className={`h-4 w-4 mr-2 ${loading.conversations ? "animate-spin" : ""}`} />
                    Refresh Conversations
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Profile Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {userProfile ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Profile exists</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-sm">No profile found</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Narrative Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  {narrativeProfile ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Initialized</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm">Not initialized</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Juno Personality</CardTitle>
                </CardHeader>
                <CardContent>
                  {junoPersonality && Object.keys(junoPersonality).length > 0 ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{Object.keys(junoPersonality).length} layers</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm">Not initialized</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            {/* User Profile */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      User Profile (Structured)
                    </CardTitle>
                    <CardDescription>Questionnaire data stored at users/{user.uid}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection("profile")}
                  >
                    {expandedSections.profile ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.profile && (
                <CardContent>
                  {loading.profile ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(JSON.stringify(userProfile, null, 2))}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy JSON
                        </Button>
                      </div>
                      {renderJson(userProfile)}
                    </>
                  )}
                </CardContent>
              )}
            </Card>

            {/* Narrative Profile */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Narrative Profile
                    </CardTitle>
                    <CardDescription>Unstructured info at users/{user.uid}/narrativeProfile/data</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection("narrative")}
                  >
                    {expandedSections.narrative ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.narrative && (
                <CardContent>
                  {loading.narrative ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(JSON.stringify(narrativeProfile, null, 2))}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy JSON
                        </Button>
                      </div>
                      {renderJson(narrativeProfile)}
                    </>
                  )}
                </CardContent>
              )}
            </Card>

            {/* Juno Personality System */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Juno Personality System
                    </CardTitle>
                    <CardDescription>4-layer personality at users/{user.uid}/junoPersonality</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection("personality")}
                  >
                    {expandedSections.personality ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.personality && (
                <CardContent>
                  {loading.personality ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      {junoPersonality && (
                        <div className="mb-4 flex gap-2 flex-wrap">
                          {Object.keys(junoPersonality).map((layer) => (
                            <Badge key={layer} variant="secondary">
                              {layer}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(JSON.stringify(junoPersonality, null, 2))}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy JSON
                        </Button>
                      </div>
                      {renderJson(junoPersonality)}
                    </>
                  )}
                </CardContent>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversations ({conversations.length})
                </CardTitle>
                <CardDescription>All conversations for this user</CardDescription>
              </CardHeader>
              <CardContent>
                {loading.conversations ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : conversations.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No conversations found</p>
                ) : (
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.conversation_number}
                        className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => loadConversation(conv.conversation_number)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge>#{conv.conversation_number}</Badge>
                              <span className="text-sm font-medium">
                                {conv.message_count} message(s)
                              </span>
                            </div>
                            {conv.preview && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {conv.preview}
                              </p>
                            )}
                            {conv.last_message_at && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(conv.last_message_at).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedConversation && (
              <Card>
                <CardHeader>
                  <CardTitle>Conversation #{selectedConversation.conversation_number}</CardTitle>
                  <CardDescription>Full conversation details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(selectedConversation, null, 2))}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy JSON
                    </Button>
                  </div>
                  {renderJson(selectedConversation)}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="api-logs" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Call Logs</CardTitle>
                    <CardDescription>Recent API calls and responses (last 50)</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setApiLogs([])}
                  >
                    Clear Logs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {apiLogs.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No API calls yet</p>
                    ) : (
                      apiLogs.map((log, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 bg-muted/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  log.status === "success"
                                    ? "default"
                                    : log.status === "error"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {log.status}
                              </Badge>
                              <code className="text-xs font-mono">
                                {log.method} {log.endpoint}
                              </code>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {log.duration && <span>{log.duration}ms</span>}
                              <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                            </div>
                          </div>
                          {log.error && (
                            <div className="mt-2 p-2 bg-destructive/10 rounded text-sm text-destructive">
                              {log.error}
                            </div>
                          )}
                          {log.response && (
                            <details className="mt-2">
                              <summary className="text-sm cursor-pointer text-muted-foreground">
                                View Response
                              </summary>
                              <pre className="text-xs bg-background p-2 rounded mt-2 overflow-auto max-h-48">
                                {JSON.stringify(log.response, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

