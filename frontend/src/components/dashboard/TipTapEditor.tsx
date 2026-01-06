// @see https://tiptap.dev/docs/editor/getting-started/install/react

import "../../styles/tiptap.css";

import { TextStyleKit } from '@tiptap/extension-text-style'
import {Highlight} from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit' // StarterKit includes Document / Paragraph / Text / Bold, Italic, Strike / Heading / Blockquote /Listes / CodeBlock / History (undo/redo) / DropCursor....
import { useCallback } from "react";

import { LuUndo2, LuRedo2, LuBold, LuItalic, LuImage, LuCode, LuListOrdered, LuList, LuAlignJustify, LuAlignRight, LuAlignCenter, LuAlignLeft, LuStrikethrough, LuFileCode } from "react-icons/lu";


const extensions = [
  TextStyleKit, 
  StarterKit, 
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight,
  Image.configure({
    inline: false,
    resize: {
    enabled: true,
        directions: [
      'top',
      'bottom',
      'left',
      'right',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ], // can be any direction or diagonal combination
    minWidth: 50,
    minHeight: 50,
    alwaysPreserveAspectRatio: true,
    },
    allowBase64: true,
    HTMLAttributes: {
      class: 'tiptap-img', 
    },
  }), 
]

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if(url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if(!editor) {
    return null
  }

  return (
    <div className="control-group mt-5">
      <div className="button-group">
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
          <LuUndo2 size={18} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
          <LuRedo2 size={18} />
        </button>
        <button type="button" onClick={addImage}>
          <LuImage size={18}/>
        </button>
      </div>
      <div className="button-group">
        <button type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        >
          <LuBold size={18}/>
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        >
          <LuItalic size={18}/>
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        >
          <LuStrikethrough />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? 'is-active' : ''}
        >
          <LuCode />
        </button>
        <button type="button" onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button>

      </div>

      <div className="button-group">
        <button type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <LuAlignLeft />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        >
          <LuAlignCenter />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <LuAlignRight />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
        >
          <LuAlignJustify />
        </button>
      </div>

      <div className="button-group">
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? 'is-active' : ''}
        >
          H1
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          H2
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? 'is-active' : ''}
        >
          H3
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editorState.isHeading4 ? 'is-active' : ''}
        >
          H4
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editorState.isHeading5 ? 'is-active' : ''}
        >
          H5
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editorState.isHeading6 ? 'is-active' : ''}
        >
          H6
        </button>
      </div>

      <div className="button-group">
        <button type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          <LuList />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          <LuListOrdered />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? 'is-active' : ''}
        >
          <LuFileCode />
        </button>

      </div>
    </div>
  )
}

export function TipTapEditor({onChangeContent,defaultContent}: { onChangeContent: (html: string) => void, defaultContent: string }) {  
  const editor = useEditor({
    onUpdate( { editor }) { //fonction native de TiptapEditor qui surveille chaque changement
      const htmlContent = editor.getHTML()
      onChangeContent(htmlContent);
    },
    extensions,
    content: defaultContent,
  })
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap" />
    </div>
  )
}