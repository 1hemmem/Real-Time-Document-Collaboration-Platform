'use client'

export default function ErrorPage() {
  return <div className="flex justify-center items-center h-screen">
    <p>Sorry, something went wrong</p>
    <br />
    <button className="bg-black text-white p-2 rounded-md" onClick={() => {
      window.location.href = "/";
    }}>Go to Home</button>
  </div>
}