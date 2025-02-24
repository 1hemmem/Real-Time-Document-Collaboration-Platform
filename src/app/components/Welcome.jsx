"use client";

import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function Welcome({ isloggedin }) {
  const list = ["Create", "Collaborate", "Innovate"];

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full font-mono">
      <div className="max-w-2xl text-center space-y-6 px-4">
        <h1 className="text-5xl md:text-4xl font-bold">
          The best platform for you to{" "}
          <span className="text-primary">
            <Typewriter
              words={list}
              loop={true}
              cursor={true}
              cursorBlinking={false}
              cursorStyle="_"
            />
          </span>
        </h1>
        <p className="text-lg md:text-xl">
          Write documents, collaborate with your team, and innovate with our
          real-time collaborative editor.
        </p>
        {isloggedin ? (
          <div>
            <Button>
              <Link href="/playground">Go to Playground</Link>
            </Button>
          </div>
        ) : (
          <div>
            <Button>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
