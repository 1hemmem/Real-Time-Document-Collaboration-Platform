import { createClient } from "@/app/utils/supabase/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET, // Make sure to move this to env variable
});

export async function POST(request: Request) {
  try {
    console.log("Request received");

    // Get roomId from referer
    const referer = request.headers.get("referer");
    if (!referer) {
      throw new Error("No referer found in request headers");
    }

    const list = referer.split("/");
    const roomId = decodeURIComponent(list[list.length - 1]);
    console.log("Attempting to access roomId:", roomId);

    // Get user data
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }

    // Get profile data
    const profile = await supabase
      .from("profiles")
      .select("username, color, avatar")
      .eq("db_user_id", data.user.id)
      .single();

    if (profile.error) {
      throw new Error(`Profile fetch failed: ${profile.error.message}`);
    }

    // Prepare session
    const session = liveblocks.prepareSession(data.user.id, {
      userInfo: {
        name: profile.data.username,
        email: data.user.email,
        color: profile.data.color,
        avatar: profile.data.avatar,
      },
    });

    try {
      const room = await liveblocks.getRoom(roomId);
      console.log("Room data:", {
        id: room.id,
        type: room.type,
        metadata: room.metadata,
        defaultAccesses: room.defaultAccesses,
        usersAccesses: room.usersAccesses,
        groupsAccesses: room.groupsAccesses,
      });

      if (!room.usersAccesses) {
        console.log("Room has no usersAccesses defined");
        throw new Error("Room access configuration is missing");
      }
      // Check if user has access to the room specifically or if the room has a default access

      if (
        room.usersAccesses[data.user.id] ||
        (room.defaultAccesses as string[]).includes("room:presence:write")
      ) {
        console.log(
          `Access granted for user ${data.user.id} to room ${roomId}`
        );
        session.allow(roomId, [
          "room:read",
          "room:presence:write",
          "room:write",
        ]);
      } else {
        console.log(
          `User ${data.user.id} not found in room.usersAccesses:`,
          room.usersAccesses
        );
        return new Response(JSON.stringify({ redirect: "/no-access" }), {
          status: 403,
        });
      }
    } catch (roomError) {
      console.error("Error getting room data:", roomError);
      throw roomError;
    }

    // Authorize and return
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
      { status: 500 }
    );
  }
}
