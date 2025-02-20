import { Liveblocks } from "@liveblocks/node";
import Link from "next/link";
import { redirect } from 'next/navigation'
import CreateRoom from "./components/CreateRoom";
import { createClient } from './utils/supabase/server'

export default async function Home() {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET,
  });
  const userid = data.user.id
  
  
  const { data: rooms } = await liveblocks.getRooms({userId: userid});
  console.log("rooms")
  console.log(rooms)
  return <div>
    <p>Hello {data.user.email}</p>
    <br /><br />  
    <div>
      {rooms.map((room, index) => {

        const createdAt = new Date(room.createdAt).toLocaleString();
        const lastConnectionAt = new Date(room.lastConnectionAt).toLocaleString();
          
          return (
            <div key={index}>
              <Link href={`/editor/${room.id}`}>
                <br />
                <li>{room.id}</li>
                <li>Created At: {createdAt}</li>
                <li>Last Connection At: {lastConnectionAt}</li>
              </Link>
            </div>
          );
        
      })}
    </div>

    <br />
    <br />

    <CreateRoom />
  </div>
}