import { createClient } from "@/app/utils/supabase/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET,
});

export async function POST(request: Request) {
    const supabase = await createClient();
    console.log("Request received");
    console.log(request);
    try {
        const body = await request.json();
        const { roomId, username } = body;

        if (!roomId || !username) {
            return new Response(
                JSON.stringify({ error: "roomId and username are required" }),
                { status: 400 }
            );
        }

        // Get user from Supabase
        const { data, error } = await supabase
            .from("profiles")
            .select("db_user_id")
            .eq("username", username)
            .single();

        if (error) {
            console.error("Profile fetch error:", error);
            return new Response(
                JSON.stringify({ error: "Profile fetch failed" }),
                { status: 500 }
            );
        }

        if (!data) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404 }
            );
        }

        const userId = data.db_user_id;

        // Add user to Liveblocks room
        const response = await fetch(`https://api.liveblocks.io/v2/rooms/${roomId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.LIVEBLOCKS_SECRET}`
            },
            body: JSON.stringify({
                usersAccesses: { [userId]: ["room:read", "room:presence:write"] }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Liveblocks API error:", errorData);
            return new Response(
                JSON.stringify({
                    error: "Failed to add user to room",
                    details: errorData
                }),
                { status: response.status }
            );
        }

        const room = await response.json();
        return new Response(
            JSON.stringify({ roomId: room.id }),
            { status: 200 }
        );

    } catch (err) {
        console.error("Unexpected error:", err);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}