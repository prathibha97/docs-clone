'use client';
import { RemoveDialog } from '@/components/remove-dialog';
import { RenameDialog } from '@/components/rename-dialog';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useEditorStore } from '@/store/use-editor-store';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import {
  Bold,
  File,
  FileJson,
  FilePen,
  FilePlus,
  FileText,
  Globe,
  Italic,
  Printer,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Text,
  Trash,
  Underline,
  Undo2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsFilePdf } from 'react-icons/bs';
import { toast } from 'sonner';
import { api } from '../../../../convex/_generated/api';
import { Doc } from '../../../../convex/_generated/dataModel';
import { Avatars } from './avatars';
import { DocumentInput } from './document-input';
import { Inbox } from './inbox';

interface NavbarProps {
  data: Doc<'documents'>;
}

export const Navbar = ({ data }: NavbarProps) => {
  const router = useRouter();
  const { editor } = useEditorStore();

  const mutation = useMutation(api.documents.create);

  const newDocument = () => {
    mutation({ title: 'Untitled Document', initialContent: '' }).then((id) => {
      toast.success('Document created');
      router.push(`/documents/${id}`);
    });
  };
  const insertTables = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };
  const onSaveJson = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json',
    });
    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHtml = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], { type: 'text/html' });
    onDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], { type: 'text/plain' });
    onDownload(blob, `${data.title}.txt`);
  };
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={36} height={36} />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput title={data.title} id={data._id} />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] roundedsm hover: bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <File className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJson className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <Globe className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileText className='size-4 mr-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={newDocument}>
                    <FilePlus className='size-4 mr-2' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePen className='size-4 mr-2' />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash className='size-4 mr-2' />
                      Remove
                    </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <Printer className='size-4 mr-2' />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] roundedsm hover: bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2 className='size-4 mr-2' />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2 className='size-4 mr-2' />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] roundedsm hover: bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTables(1, 1)}>
                        1 x 1
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTables(2, 2)}>
                        2 x 2
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTables(3, 3)}>
                        3 x 3
                      </MenubarItem>
                      <MenubarItem onClick={() => insertTables(4, 4)}>
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] roundedsm hover: bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Text className='size-4 mr-2' />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <Bold className='size-4 mr-2' />
                        Bold<MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <Italic className='size-4 mr-2' />
                        Italic<MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <Underline className='size-4 mr-2' />
                        Underline<MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <Strikethrough className='size-4 mr-2' />
                        Strikethrough&nbsp;&nbsp;
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormatting className='size-4 mr-2' />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className='flex gap-3 items-center pl-6'>
        <Inbox />
        <Avatars />
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  );
};
