'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useMutation } from 'convex/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
  children: React.ReactNode;
}

export const RenameDialog = ({
  children,
  documentId,
  initialTitle,
}: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [Open, setOpen] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);
    update({
      id: documentId,
      title,
    })
      .then(() => {
        setOpen(false);
        toast.success('Document renamed successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };
  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Document name'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='ghost'
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isUpdating}
              type='submit'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
