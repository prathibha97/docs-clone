'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { type Level } from '@tiptap/extension-heading';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Highlighter,
  Image,
  Italic,
  Link2,
  List,
  ListCollapse,
  ListOrdered,
  ListTodo,
  LucideIcon,
  MessageSquarePlus,
  Minus,
  Plus,
  Printer,
  Redo2,
  RemoveFormatting,
  Search,
  SpellCheck,
  Underline,
  Undo2,
  Upload,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { SketchPicker, type ColorResult } from 'react-color';

const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const lineHeight = [
    { label: 'Default', value: 'normal' },
    { label: 'Single', value: '1' },
    { label: '1.15', value: '1.15' },
    { label: '1.5', value: '1.5' },
    { label: 'Double', value: '2' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListCollapse className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lineHeight.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              'flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('paragraph').lineHeight === value &&
                'bg-neutral-200/80'
            )}
          >
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize =
    editor?.getAttributes('textStyle').fontSize?.replace('px', '') || '16';

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  // Sync font size state with editor attributes
  useEffect(() => {
    setFontSize(currentFontSize);
    setInputValue(currentFontSize);
  }, [currentFontSize]);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize, 10);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    } else if (e.key === 'Escape') {
      // Reset input and exit editing mode on Escape key
      setIsEditing(false);
      setInputValue(fontSize);
    }
  };

  const increment = () => {
    const newSize = (parseInt(inputValue, 10) || 0) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = (parseInt(inputValue, 10) || 0) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className='flex items-center gap-x-1'>
      <button
        className='size-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
        onClick={decrement}
        aria-label='Decrease font size'
      >
        <Minus className='size-4' />
      </button>
      {isEditing ? (
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className='h-7 w-12 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0'
        />
      ) : (
        <button
          className='h-7 w-12 text-sm border border-neutral-400 text-center rounded-sm bg-transparent cursor-text'
          onClick={() => setIsEditing(true)}
        >
          {fontSize}
        </button>
      )}
      <button
        className='size-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
        onClick={increment}
        aria-label='Increase font size'
      >
        <Plus className='size-4' />
      </button>
    </div>
  );
};
const ListButton = () => {
  const { editor } = useEditorStore();
  const lists = [
    {
      label: 'Bullet List',
      icon: List,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Ordered List',
      icon: ListOrdered,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <List className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lists.map(({ icon: Icon, label, isActive, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              'flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-200/80',
              isActive() && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();
  const alignments = [
    { label: 'Align Left', value: 'left', icon: AlignLeft },
    { label: 'Align Center', value: 'center', icon: AlignCenter },
    { label: 'Align Right', value: 'right', icon: AlignRight },
    { label: 'Align Justify', value: 'justify', icon: AlignJustify },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <AlignLeft className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignments.map(({ icon: Icon, label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              'flex items-center gap-x-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setIsDialogOpen(false);
      setImageUrl('');
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
            <Image className='size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <Upload className='mr-2 size-4' />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <Search className='mr-2 size-4' />
            Paste image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder='Insert image URL'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit} disabled={!imageUrl}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setvalue] = useState('');
  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setvalue('');
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setvalue(editor?.getAttributes('link').href);
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2 className='size-4' />
          <div className='h-0.5 w-full' style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
        <Input
          placeholder='https://example.com'
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('highlight').color || '#000000';
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Highlighter className='size-4' />
          <div className='h-0.5 w-full' style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('textStyle').color || '#000000';
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='text-xs'>A</span>
          <div
            className='h-0.5 w-full'
            style={{ backgroundColor: value }}
          ></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: 'Normal text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ];
  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive(`heading`, { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal text';
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>{getCurrentHeading()}</span>
          <ChevronDown className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              (value === 0 && !editor?.isActive('heading')) ||
                (editor?.isActive(`heading`, { level: value }) &&
                  'bg-neutral-200/80')
            )}
            style={{ fontSize }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: 'Ariel', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDown className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle').fontFamily === value &&
                'bg-neutral-200/80'
            )}
            style={{ fontFamily: value }}
          >
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
        isActive: editor?.isActive('liveblocksCommentMark'),
        onClick: () => editor?.chain().focus().addPendingComment().run(),
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
      <FontFamilyButton />
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      <FontSizeButton />
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      {sections[1]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='bg-neutral-300 h-6' />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      {sections[2]?.map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
