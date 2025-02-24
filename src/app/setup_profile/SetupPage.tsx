"use client";
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
  const [kacherror, setKachError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const avatars = Array.from({ length: 15 }, (_, i) => ({
    id: `avatar-${i + 1}`,
    url: `https://liveblocks.io/avatars/avatar-${i + 1}.png`,
  }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setKachError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await setupProfile(formData);
      if (result?.error) {
        setKachError(result.error);
      } else {
        setSuccess("Profile setup successful");
        window.location.href = "/";
      }
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
                <Input id="first_name" name="first_name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" name="last_name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatar">Select Avatar</Label>
                <AvatarSelector avatars={avatars} name="avatar" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Preferred Color</Label>
                <Input id="color" name="color" type="color" required />
              </div>
              {kacherror && <p className="text-red-500 text-sm">{kacherror}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Setup Profile"
                )}
              </Button>
              {/* <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100"
              >
                Next
              </Button> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
