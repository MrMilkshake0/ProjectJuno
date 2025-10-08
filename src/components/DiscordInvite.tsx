// Minimal Discord-style card: dark bg + big blurple button
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

type Props = {
  inviteUrl: string;
  serverName: string;
};

export default function DiscordInvite({ inviteUrl, serverName }: Props) {
  return (
    <Card className="bg-[#2b2d31] text-white rounded-xl shadow-md border-0">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-semibold">{serverName}</h3>
        <p className="mt-2 text-sm text-white/70">
          Join our Discord for updates, feedback, and meeting the community.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-6 w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold rounded-lg"
        >
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Join ${serverName} on Discord`}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Join the Discord
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
