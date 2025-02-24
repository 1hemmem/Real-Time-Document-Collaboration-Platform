import { Liveblocks } from "@liveblocks/node";
import Link from "next/link";
import { redirect } from "next/navigation";
import CreateRoom from "../components/CreateRoom";
import { createClient } from "../utils/supabase/server";
import { DataTable } from "./documents-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET,
  });
  
  const userid = data.user.id;
  const { data: rooms } = await liveblocks.getRooms({ userId: userid });
  
  const columns = [
    {
      header: "Document Name",
      accessorKey: "id",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Last Connection At",
      accessorKey: "lastConnectionAt",
    },
  ];

  const rowdata = rooms.map((room) => ({
    id: room.id,
    createdAt: new Date(room.createdAt).toLocaleString(),
    lastConnectionAt: new Date(room.lastConnectionAt).toLocaleString(),
  }));

  return (
    <div className="container mx-auto py-10 px-4 ">
      <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-2xl font-bold font-mono">
            My Documents
          </CardTitle>
          <CreateRoom />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rowdata.length > 0 ? (
              <DataTable columns={columns} data={rowdata} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No documents yet. Create your first document to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}