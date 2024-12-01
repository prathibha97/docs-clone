import { FC } from 'react';
import { Editor } from './editor';
import { Navbar } from './navbar';
import { Room } from './room';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
  const awaitedParams = await params;
  const documentId = awaitedParams.documentId;

  return (
    <Room>
      <div className='min-h-screen bg-[#FAFBFD]'>
        <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
          <Navbar />
          <Toolbar />
        </div>
        <div className='pt-[114px] print:pt-0'>
          <Editor />
        </div>
      </div>
    </Room>
  );
};

export default DocumentIdPage;
