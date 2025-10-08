// src/components/auth/LoginPanel.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function LoginPanel({ onSuccess }: { onSuccess?: () => void }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, loading } = useAuth();

  // shared local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in!");
      onSuccess?.();
    } catch (e: any) {
      toast.error(e?.message || "Sign-in failed.");
    }
  };

  const handleEmailSignIn = async () => {
    if (!email || !password) return toast.error("Email and password are required.");
    try {
      await signInWithEmail(email.trim(), password);
      toast.success("Signed in!");
      onSuccess?.();
    } catch (e: any) {
      toast.error(e?.message || "Email sign-in failed.");
    }
  };

  const handleEmailSignUp = async () => {
    if (!email || !password) return toast.error("Email and password are required.");
    try {
      await signUpWithEmail(email.trim(), password, displayName.trim() || undefined);
      toast.success("Account created! You’re signed in.");
      onSuccess?.();
    } catch (e: any) {
      toast.error(e?.message || "Sign-up failed.");
    }
  };

  const handleReset = async () => {
    if (!email) return toast.error("Enter your email to reset.");
    try {
      await resetPassword(email.trim());
      toast.success("Password reset email sent.");
    } catch (e: any) {
      toast.error(e?.message || "Failed to send reset email.");
    }
  };

  return (
    <Card className="border-muted">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Sign in to continue, or create a new account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={handleGoogle} disabled={loading} className="w-full" variant="secondary">
          <LogIn className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>

        <Tabs defaultValue="signin" className="mt-2">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Create account</TabsTrigger>
          </TabsList>

          {/* Sign in */}
          <TabsContent value="signin" className="mt-4 space-y-3">
            <div className="grid gap-2">
              <Label htmlFor="email-si">Email</Label>
              <Input id="email-si" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password-si">Password</Label>
              <Input
                id="password-si"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleEmailSignIn} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Email
            </Button>
            <button
              className="text-xs text-muted-foreground hover:underline self-start"
              type="button"
              onClick={handleReset}
            >
              Forgot password?
            </button>
          </TabsContent>

          {/* Sign up */}
          <TabsContent value="signup" className="mt-4 space-y-3">
            <div className="grid gap-2">
              <Label htmlFor="name-su">Display name (optional)</Label>
              <Input
                id="name-su"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email-su">Email</Label>
              <Input id="email-su" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password-su">Password</Label>
              <Input
                id="password-su"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
            <Button onClick={handleEmailSignUp} className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Create account
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
