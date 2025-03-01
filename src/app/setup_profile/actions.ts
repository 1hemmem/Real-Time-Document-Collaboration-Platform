"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../utils/supabase/server";

export async function setupProfile(formData: FormData) {
  const supabase = await createClient();
  const userdata = await supabase.auth.getUser();
  const userid = userdata.data.user.id;
  const avatar = formData.getAll("avatar")[1];

  const data = {
    db_user_id: userid,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    username: formData.get("username") as string,
    color: formData.get("color") as string,
    avatar: avatar as string,
  };
  console.log("setup profile");
  console.log(data);
  const { error } = await supabase.from("profiles").insert(data);
  if (error) {
    if (
      error.message ===
      'duplicate key value violates unique constraint "profiles_username_key"'
    ) {
      return { error: "Username already exists" };
    } else if (
      error.message ===
      'duplicate key value violates unique constraint "profiles_db_user_id_key"'
    ) {
      return { error: "You already have an account" };
    } else {
      return { error: error.message };
    }
  } else {
    return { success: "Profile setup successful" };
  }
}
