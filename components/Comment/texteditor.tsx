'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Dispatch, SetStateAction } from 'react';

export default function TiptapComment({editor}: {editor: Editor | null}) {
  if(!editor) return null;

  return (
    <EditorContent className="
      flex-1 self-stretch cursor-text
      border border-[#ccc] rounded-[4px]" editor={editor}
      onClick={() => editor?.commands.focus()}/>
  )
}