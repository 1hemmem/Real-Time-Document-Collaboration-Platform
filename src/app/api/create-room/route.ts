import { createClient } from "@/app/utils/supabase/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET,
});

export async function POST(request: Request) {
  const supabase = await createClient();

  // Authenticate user with Supabase
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Supabase auth error:", error);
    return new Response(JSON.stringify({ error: "Authentication failed" }), {
      status: 401,
    });
  }

  const user = data.user;
  const { roomId } = await request.json();

  // Create the room with user permissions
  try {
    const room = await liveblocks.createRoom(roomId, {
      defaultAccesses: [], // No default access
      usersAccesses: {
        [user.id]: ["room:read", "room:presence:write"], // Assign permissions to the user
      },
    });

    // Return the room ID or full room object
    return new Response(JSON.stringify({ roomId: room.id }), { status: 200 });
  } catch (err) {
    console.error("Liveblocks createRoom error:", err);
    return new Response(JSON.stringify({ error: "Room creation failed" }), {
      status: 500,
    });
  }
}
