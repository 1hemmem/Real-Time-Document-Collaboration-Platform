"use client";
import { signout } from "../login/actions";

export default function SignOutButton() {
  return (
    <button
      onClick={() => {
        signout();
      }}
    >
      Sign Out
    </button>
  );
}
