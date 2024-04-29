'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Tiptap({update}: {update: (e: Editor) => void}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '',
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