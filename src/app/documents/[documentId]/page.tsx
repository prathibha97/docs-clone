import { FC } from 'react';
import { Editor } from './editor';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
  const awaitedParams = await params;
  const documentId = awaitedParams.documentId;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <Toolbar/>
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
