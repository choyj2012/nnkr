import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Tiptap() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '',
  })

  return (
    <EditorContent className="
      w-full min-h-32 cursor-text
      border border-[#ccc] rounded-[4px]" editor={editor}
      onClick={() => editor?.commands.focus()}/>
  )
}