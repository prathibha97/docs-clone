import { RemoveDialog } from '@/components/remove-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLink, FilePen, MoreVertical, Trash } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import { RenameDialog } from '@/components/rename-dialog';

interface DocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: (id: string) => void;
}

export const DocumentMenu = ({
  documentId,
  onNewTab,
  title,
}: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <FilePen className='size-4 mr-2' />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <Trash className='size-4 mr-2' />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLink className='size-4' />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
