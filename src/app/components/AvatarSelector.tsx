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
    console.log(selectedAvatar);
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
          <div key={avatar.id} className="relative">
            <input
              type="radio"
              id={avatar.id}
              name="avatar"
              value={avatar.url}
              className="sr-only"
              onChange={() => handleAvatarClick(avatar.id)}
              checked={selectedAvatar === avatar.id}
            />
            <Label
              htmlFor={avatar.id}
              className={`flex aspect-square cursor-pointer items-center justify-center rounded-3xl border-2 ${
                selectedAvatar === avatar.id
                  ? "border-gray-900" // Use a darker border for selected avatar
                  : "border-gray-300"
              }`}
            >
              <Image
                src={avatar.url}
                alt={`Avatar ${avatar.id}`}
                width={96} // Required for Next.js Image component
                height={96} // Required for Next.js Image component
                className="h-12 w-12 rounded-3xl object-cover" // Ensure the image fits properly
              />
              {selectedAvatar === avatar.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
                  <Check className="h-6 w-6 text-white" /> {/* Use white for better visibility */}
                </div>
              )}
            </Label>
          </div>
        ))}
      </div>
    </>
  );
}