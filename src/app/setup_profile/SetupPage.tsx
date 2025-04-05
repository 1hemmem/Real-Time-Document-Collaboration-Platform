"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AvatarSelector } from "../components/AvatarSelector";
import { Label } from "@/components/ui/label";
import { setupProfile } from "./actions";
import { Loader2 } from "lucide-react";

export function SetupPage() {
  const [loading, setLoading] = useState(false);

  const avatars = Array.from({ length: 15 }, (_, i) => ({
    id: `avatar-${i + 1}`,
    url: `https://liveblocks.io/avatars/avatar-${i + 1}.png`,
  }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Setting up your profile...");

    const formData = new FormData(event.currentTarget);

    try {
      const result = await setupProfile(formData);

      toast.dismiss(loadingToast);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Setup</CardTitle>
          <CardDescription>
            Fill in the form below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatar">Select Avatar</Label>
                <AvatarSelector avatars={avatars} name="avatar" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Preferred Color</Label>
                <Input
                  id="color"
                  name="color"
                  type="color"
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Setup Profile"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
