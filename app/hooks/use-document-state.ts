'use client';

import { useState, useCallback } from 'react';
import { Document, Connection } from '@/app/types/document';

interface DocumentState {
  documents: Document[];
  connections: Connection[];
  selectedDocuments: Set<string>;
  searchQuery: string;
}

export function useDocumentState() {
  const [state, setState] = useState<DocumentState>({
    documents: [],
    connections: [],
    selectedDocuments: new Set(),
    searchQuery: '',
  });

  const addDocuments = useCallback((files: File[]) => {
    setState((prev) => ({
      ...prev,
      documents: [
        ...prev.documents,
        ...files.map((file, index) => ({
          id: `${Date.now()}-${index}`,
          name: file.name,
          type: file.type,
          position: { x: 100 + index * 50, y: 100 + index * 50 },
          connections: [],
        })),
      ],
    }));
  }, []);

  const updatePosition = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setState((prev) => ({
        ...prev,
        documents: prev.documents.map((doc) =>
          doc.id === id ? { ...doc, position } : doc
        ),
      }));
    },
    []
  );

  const deleteDocument = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      documents: prev.documents.filter((doc) => doc.id !== id),
      connections: prev.connections.filter(
        (conn) => conn.from !== id && conn.to !== id
      ),
    }));
  }, []);

  const addConnection = useCallback((from: string, to: string) => {
    setState((prev) => ({
      ...prev,
      connections: [...prev.connections, { from, to }],
    }));
  }, []);

  const toggleSelection = useCallback((id: string) => {
    setState((prev) => {
      const newSelection = new Set(prev.selectedDocuments);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { ...prev, selectedDocuments: newSelection };
    });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  return {
    state,
    addDocuments,
    updatePosition,
    deleteDocument,
    addConnection,
    toggleSelection,
    setSearchQuery,
  };
}
