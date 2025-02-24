import { createClient } from "./utils/supabase/server";
import { Welcome } from "./components/Welcome";
export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  let isloggedin = true
  if (error || !data?.user) {
    isloggedin = false
  }

  return (
    <div className="pt-20">
      <Welcome isloggedin={isloggedin}/>
    </div>
  );
}
