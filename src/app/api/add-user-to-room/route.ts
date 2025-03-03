import { createClient } from "@/app/utils/supabase/server";
import { Liveblocks } from "@liveblocks/node";
import { z } from "zod";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET,
});

export async function POST(request: Request) {
  const supabase = await createClient();

  const User = z.object({
    username: z.string(),
    room: z.string(),
  });
  try {
    const body = await request.json();
    const { roomId, username } = body;

    // Validate input
    if (!User.parse({ username: username, room: roomId })) {
      return new Response(
        JSON.stringify({ error: "Room ID and username are required" }),
        { status: 400 },
      );
    }

    // Get user from Supabase
    const { data, error } = await supabase
      .from("profiles")
      .select("db_user_id")
      .eq("username", username)
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch user profile" }),
        { status: 500 },
      );
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const userId = data.db_user_id;

    // Add user to Liveblocks room
    const liveblocksResponse = await fetch(
      `https://api.liveblocks.io/v2/rooms/${roomId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET}`,
        },
        body: JSON.stringify({
          usersAccesses: { [userId]: ["room:read", "room:presence:write"] },
        }),
      },
    );

    if (!liveblocksResponse.ok) {
      const errorData = await liveblocksResponse.json();
      return new Response(
        JSON.stringify({
          error: "Failed to add user to the room",
          details: errorData,
        }),
        { status: liveblocksResponse.status },
      );
    }

    const room = await liveblocksResponse.json();
    return new Response(JSON.stringify({ roomId: room.id }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 },
    );
  }
}
