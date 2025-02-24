"use client"; // Mark this as a Client Component

import { useState } from "react";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function AvatarSelector({
  avatars,
  name,
}: {
  avatars: { id: string; url: string }[];
  name: string; 
}) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const handleAvatarClick = (avatarId: string) => {
    console.log(selectedAvatar)
    setSelectedAvatar(avatarId);
  };

  return (
    <>
      <input
        type="hidden"
        name={name}
        value={selectedAvatar || ""}
      />
      <div className="grid grid-cols-5 gap-2">
        {avatars.map((avatar) => (
          <div key={avatar.url} className="relative">
            <input
              type="radio"
              id={avatar.url}
              name="avatar"
              value={avatar.url}
              className="sr-only"
              onChange={() => handleAvatarClick(avatar.id)}
              checked={selectedAvatar === avatar.id}
            />
            <Label
              htmlFor={avatar.url}
              className={`flex aspect-square cursor-pointer items-center justify-center rounded-3xl ${
                selectedAvatar === avatar.id
                  ? "border-2 border-gray- "
                  : "border-gray-300"
              }`}
            >
              <Image
                src={avatar.url}
                alt={`Avatar ${avatar.id}`}
                className={`h-12 w-12 rounded-3xl ${
                  selectedAvatar === avatar.url ? "opacity-90" : ""
                }`}
              />
              {selectedAvatar === avatar.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="h-6 w-6 text-black" />
                </div>
              )}
            </Label>
          </div>
        ))}
      </div>
    </>
  );
}