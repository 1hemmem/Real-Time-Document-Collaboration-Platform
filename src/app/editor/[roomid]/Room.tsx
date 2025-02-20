"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useOthers,
} from "@liveblocks/react/suspense";
import { Editor } from "../../components/Editor";
import AddUserToRoom from "../../components/AddUserToRoom";
// USER PRESENCE LIST
function UsersList() {

  const numUsers = useOthers();
  console.log("number of other users", numUsers);
  return <div>
    Number of other users in the room: {numUsers.length}
    <br />
    users: {numUsers.map((user, index) => {
      return <div key={index}>{user.info.name} {user.info.color}</div>
    })}
  </div>;
}

export function Room({ roomid }: { roomid: string }) {  
  return (  
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
    >
      <RoomProvider id={decodeURIComponent(roomid)}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <>
            <UsersList />
            <Editor />
          </>
        </ClientSideSuspense>
      </RoomProvider>
      <AddUserToRoom roomid={roomid} />
    </LiveblocksProvider>
  );
}