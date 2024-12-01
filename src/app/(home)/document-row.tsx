import { TableCell, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Building2, CircleUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SiGoogledocs } from 'react-icons/si';
import { Doc } from '../../../convex/_generated/dataModel';
import { DocumentMenu } from './document-menu';

interface DocumentRowProps {
  document: Doc<'documents'>;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();
  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, '_blank');
  };

  const onRowClick = (id: string) => {
    router.push(`/documents/${id}`);
  };
  return (
    <TableRow
      className='cursor-pointer'
      onClick={() => onRowClick(document._id)}
    >
      <TableCell className='w-[50px]'>
        <SiGoogledocs className='size-6 fill-blue-500' />
      </TableCell>
      <TableCell className='font-medium md:w-[45%]'>{document.title}</TableCell>
      <TableCell className='text-muted-foreground hidden md:flex items-center gap-2'>
        {document.organizationId ? (
          <Building2 className='size-4' />
        ) : (
          <CircleUser className='size-4' />
        )}
        {document.organizationId ? 'Organization' : 'personal'}
      </TableCell>
      <TableCell className='text-muted-foreground hidden md:table-cell'>
        {format(new Date(document._creationTime), 'MMM-dd-yyyy')}
      </TableCell>
      <TableCell className='flex justify-end'>
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};
