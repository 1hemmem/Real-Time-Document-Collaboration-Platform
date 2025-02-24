import { cn } from "@/lib/utils";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import { SetupPage } from "./SetupPage";
export default async function SetupProfile({
  className,
  searchParams,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { searchParams?: URLSearchParams }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}></div>
        <SetupPage />
      </div>
    </div>
  );
}
