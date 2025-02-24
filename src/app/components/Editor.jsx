"use client";

import { useLiveblocksExtension, FloatingToolbar, Toolbar } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';

const lowlight = createLowlight();

export function Editor({children}) {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
        heading: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: '<h1>Start writing...</h1>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className=""> 
      <div className="border rounded-lg shadow-lg bg-white">
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex-1">
            <Toolbar editor={editor}>
              <div className="flex flex-wrap gap-2">
                <Toolbar.BlockSelector />
                <Toolbar.Separator />
                <Toolbar.SectionInline />
                <Toolbar.Separator />
                <button
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                  }`}
                >
                  Left
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                  }`}
                >
                  Center
                </button>
                <button
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                  }`}
                >
                  Right
                </button>
                <Toolbar.Separator />
              </div>
            </Toolbar>
          </div>
          <div className="flex items-center ml-4">
            {children}
          </div>
        </div>
        
        <style>
          {`
            .editor {
              padding: 1rem;
              min-height: 600px;
              width: 100%;
              max-width: 100%;
            }
            .editor h1 {
              font-size: 2em;
              font-weight: bold;
              margin: 1em 0;
            }
            .editor h2 {
              font-size: 1.5em;
              font-weight: bold;
              margin: 0.83em 0;
            }
            .editor h3 {
              font-size: 1.17em;
              font-weight: bold;
              margin: 0.67em 0;
            }
            .editor ul {
              list-style-type: disc;
              padding-left: 2em;
              margin: 1em 0;
            }
            .editor ol {
              list-style-type: decimal;
              padding-left: 2em;
              margin: 1em 0;
            }
            .editor li {
              margin: 0.5em 0;
            }
            .editor p {
              margin: 1em 0;
            }
          `}
        </style>
        
        <EditorContent 
          editor={editor} 
          className="editor"
        />
        
        <FloatingToolbar 
          editor={editor}
          className="bg-white shadow-lg border rounded-lg"
        />
      </div>
    </div>
  );
}