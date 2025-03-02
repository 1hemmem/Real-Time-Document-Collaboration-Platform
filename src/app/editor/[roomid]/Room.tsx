"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useOthers,
} from "@liveblocks/react/suspense";
import { Editor } from "../../components/Editor";
import { BarLoader } from "../../components/BarLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

function UsersList() {
  const users = useOthers();

  return (
    <div className="flex gap-3 p-4 rounded-lg">
      {" "}
      {users.map((user, index) => (
        <div key={index} className="relative group">
          <Avatar className="w-12 h-12 border border-gray-300">
            <AvatarImage src={user.info.avatar} alt={user.info.name} />
            <AvatarFallback className="bg-gray-300 text-white">
              {user.info.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Tooltip for username */}
          <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {user.info.name}
          </div>
        </div>
      ))}
    </div>
  );
}
export function Room({ roomid }: { roomid: string }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
        });
        if (response.status === 403) {
          router.replace("/no-access");
          return;
        }
        setAuthorized(true);
        if (response.status === 501) {
          router.replace("/setup_profile");
          toast.info("you need to setup your profile first");
        }
      } catch (error) {
        console.error("Authorization check failed:", error);
        router.replace("/no-access");
      }
    };

    checkAuthorization();
  }, [roomid, router]);

  if (authorized === null) {
    return <BarLoader />; // Show loading while checking authorization
  }

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={decodeURIComponent(roomid)}>
        <ClientSideSuspense fallback={<BarLoader />}>
          <>
            <Editor>
              <UsersList />
            </Editor>
          </>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
