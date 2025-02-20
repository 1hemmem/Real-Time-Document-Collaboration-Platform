"use client";

import { useLiveblocksExtension, FloatingToolbar,Toolbar } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


export function Editor() {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        // The Liveblocks extension comes with its own history handling
        history: false,
      }),
    ],
    immediatelyRender: false,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Collaboration Editor</h1>
      <div className="border border-black p-4">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className="editor" />
        <FloatingToolbar editor={editor} />
      </div>
    </div>
  );
}