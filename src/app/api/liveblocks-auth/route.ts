import { createClient } from "@/app/utils/supabase/server";
import { Liveblocks } from "@liveblocks/node";
import { toast } from "sonner";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET, // Make sure to move this to env variable
});

export async function POST(request: Request) {
  try {
    // Get roomId from referer
    const referer = request.headers.get("referer");
    if (!referer) {
      throw new Error("No referer found in request headers");
    }

    const list = referer.split("/");
    const roomId = decodeURIComponent(list[list.length - 1]);

    // Get user data
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.status,
      });
    }

    // Get profile data
    const profile = await supabase
      .from("profiles")
      .select("username, color, avatar")
      .eq("db_user_id", data.user.id)
      .single();

    if (profile.error) {
      return new Response(JSON.stringify({ error: profile.error.message }), {
        status: 501,
      });
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

      if (!room.usersAccesses) {
        return new Response(JSON.stringify({ error: profile.error.message }), {
          status: 501,
        });
      }
      // Check if user has access to the room specifically or if the room has a default access

      if (
        room.usersAccesses[data.user.id] ||
        (room.defaultAccesses as string[]).includes("room:presence:write")
      ) {
        session.allow(roomId, [
          "room:read",
          "room:presence:write",
          "room:write",
        ]);
      } else {
        return new Response(JSON.stringify({ redirect: "/no-access" }), {
          status: 403,
        });
      }
    } catch (roomError) {
      return new Response(JSON.stringify({ error: roomError.message }), {
        status: 502,
      });
    }

    // Authorize and return
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
      { status: 500 },
    );
  }
}
