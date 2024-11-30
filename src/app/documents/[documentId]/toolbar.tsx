'use client';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
  Bold,
  Italic,
  ListTodo,
  LucideIcon,
  MessageSquarePlus,
  Printer,
  Redo2,
  RemoveFormatting,
  SpellCheck,
  Underline,
  Undo2,
} from 'lucide-react';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className='size-4' />
    </button>
  );
};
export const Toolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: 'Redo',
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: 'Print',
        icon: Printer,
        onClick: () => window.print(),
      },
      {
        label: 'Spell Check',
        icon: SpellCheck,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false'
          );
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: Bold,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: 'Italic',
        icon: Italic,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: 'Underline',
        icon: Underline,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlus,
        isActive: false,
        onClick: () => {
          // TODO: implement comment functionality
        },
      },
      {
        label: 'List Todo',
        icon: ListTodo,
        isActive: editor?.isActive('taskList'),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormatting,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      {/* TODO: font family */}
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      {/* TODO: heading */}
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      {/* TODO: font size */}
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      {sections[1]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: text color */}
      {/* TODO: highlight color */}
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      {/* TODO: link */}
      {/* TODO: image */}
      {/* TODO: align */}
      {/* TODO: line height */}
      {/* TODO: list */}
      {sections[2]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
