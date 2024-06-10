'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Tiptap({update, init}: {update: (e: Editor) => void, init?: string}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: init ?? '',
    onUpdate({editor}) {
      update(editor as Editor);
    },
  })

  if(!editor) return null;

  return (
    <EditorContent className="
      w-full min-h-32 cursor-text
      border border-[#ccc] rounded-[4px]" editor={editor}
      onClick={() => editor?.commands.focus()}/>
  )
}