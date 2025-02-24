'use client'

export default function ErrorPage() {
  return <div className="flex flex-col justify-center items-center h-screen">
    <p className="text-2xl font-bold font-mono">Sorry, you don't have access to this room</p>
    <br />
    <button className="bg-black text-white p-2 rounded-md" onClick={() => {
      window.location.href = "/playground";
    }}>Go back to playground</button>
  </div>
}