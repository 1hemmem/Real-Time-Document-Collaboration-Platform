"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export default function AddUserToRoomDialog({ roomid }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const User = z.object({
    username: z.string(),
  });

  const handleAddUser = async () => {
    if (!User.parse({ username: username })) {
      toast.error("Please enter a username");
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Adding user to document...");

    try {
      const response = await fetch("/api/add-user-to-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: decodeURIComponent(roomid),
          username: username.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.dismiss(loadingToast);
        toast.error(result.error || "Failed to add user to room");
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("User added successfully!");
      setOpen(false);
      setUsername("");
      router.refresh();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred");
      console.error("Failed to add user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add User to Room</DialogTitle>
          <DialogDescription>
            Enter the username of the person you want to add to this room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            placeholder="Enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddUser();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setUsername("");
              setOpen(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            disabled={!username.trim() || isLoading}
          >
            {isLoading ? "Adding..." : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
