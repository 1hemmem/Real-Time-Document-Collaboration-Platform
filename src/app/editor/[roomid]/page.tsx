import { Room } from "./Room";
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddUserToRoom from "@/app/components/AddUserToRoom";

export default async function Home({ params }: { params: { roomid: string } }) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    
    const { roomid } = await params;
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col gap-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b">
                        <Link href="/playground">
                            <Button className="bg-white text-black hover:bg-gray-100">
                                ← Back to Playground
                            </Button>
                        </Link>
                        <AddUserToRoom roomid={roomid} />
                    </div>

                    {/* Document Title and Dialog Section */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {decodeURIComponent(roomid)}
                        </h1>
                        <div className="flex justify-between items-center">
                            
                            <div className="flex items-center">
                                
                            </div>
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <Room roomid={roomid} />
                    </div>
                </div>
            </div>
        </div>
    );
}