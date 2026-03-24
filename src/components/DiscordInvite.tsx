// Minimal Discord-style card: dark bg + big blurple button
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

type Props = {
  inviteUrl: string;
  serverName: string;
};

export default function DiscordInvite({ inviteUrl, serverName }: Props) {
  return (
    <Card className="bg-[#2b2d31] text-white rounded-xl shadow-md border-0">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-semibold">{serverName}</h3>
        <p className="mt-2 text-sm text-white/60">
          Join the server and DM the bot to start talking.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-5 w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold rounded-lg group"
        >
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Join ${serverName} on Discord`}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Join Discord
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
