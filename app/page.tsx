import { DocumentCanvas } from '@/app/components/document-canvas';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Document Mapper</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Drag and drop files to create a visual map of your documents
        </p>
      </div>
      <DocumentCanvas />
    </main>
  );
}
