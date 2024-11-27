'use client';

import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DocumentCard } from '@/app/components/ui/document-card';
import { ConnectionLines } from '@/app/components/connection-lines';
import { Toolbar } from '@/app/components/toolbar';
import { useDocumentState } from '@/app/hooks/use-document-state';

export function DocumentCanvas() {
  const {
    state: { documents, connections, selectedDocuments, searchQuery },
    addDocuments,
    updatePosition,
    deleteDocument,
    addConnection,
    toggleSelection,
    setSearchQuery,
  } = useDocumentState();

  const [isDragging, setIsDragging] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      addDocuments(files);
    },
    [addDocuments]
  );

  const handleDocumentDrag = useCallback(
    (id: string, e: React.DragEvent) => {
      const { movementX, movementY } = e;
      const doc = documents.find((d) => d.id === id);
      if (doc) {
        updatePosition(id, {
          x: doc.position.x + movementX,
          y: doc.position.y + movementY,
        });
      }
    },
    [documents, updatePosition]
  );

  const handleStartConnection = useCallback(
    (id: string) => {
      if (connectingFrom === null) {
        setConnectingFrom(id);
      } else if (connectingFrom !== id) {
        addConnection(connectingFrom, id);
        setConnectingFrom(null);
      }
    },
    [connectingFrom, addConnection]
  );

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Toolbar onSearch={setSearchQuery} />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        className={cn(
          'w-full h-[calc(100vh-12rem)] bg-background relative rounded-lg',
          'transition-all duration-200 ease-in-out',
          isDragging && 'border-2 border-dashed border-primary/50 bg-primary/5'
        )}
      >
        <ConnectionLines documents={documents} connections={connections} />

        {filteredDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            isSelected={selectedDocuments.has(doc.id)}
            onDrag={handleDocumentDrag}
            onDelete={deleteDocument}
            onSelect={toggleSelection}
            onStartConnection={handleStartConnection}
          />
        ))}

        {!documents.length && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              Drag and drop files here to begin mapping
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
