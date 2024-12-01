import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';

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
    <Button variant='ghost' size='icon' className='rounded-full'>
      <MoreVertical className='size-4' />
    </Button>
  );
};
