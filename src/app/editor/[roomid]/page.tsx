import Image from "next/image";
import { Room } from "./Room";
import { Editor } from "../../components/Editor";
import { redirect } from 'next/navigation'

import { createClient } from '../../utils/supabase/server'
import Link from "next/link";
export default async function Home({ params }: { params: { roomid: string } }) {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    const room  = params.roomid
    return (
        <div >
            <p>Room ID: {room}</p>
            <Room roomid={room} />
            <Link href={`/`}>Go home page</Link>
        </div>
    );
}