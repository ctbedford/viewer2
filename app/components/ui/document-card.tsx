"use client";

import { useState } from "react";
import { File, Trash2, Link, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Document } from "@/types/document";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DocumentCardProps {
  document: Document;
  isSelected: boolean;
  onDrag: (id: string, e: React.DragEvent) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onStartConnection: (id: string) => void;
}

export function DocumentCard({
  document,
  isSelected,
  onDrag,
  onDelete,
  onSelect,
  onStartConnection,
}: DocumentCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div
        className={cn(
          "absolute p-4 bg-card rounded-lg shadow-lg cursor-move",
          "border border-border transition-colors",
          isSelected && "border-primary ring-2 ring-primary ring-opacity-50",
          !isSelected && "hover:border-primary/50"
        )}
        style={{
          left: document.position.x,
          top: document.position.y,
        }}
        draggable
        onDrag={(e) => onDrag(document.id, e)}
        onClick={() => onSelect(document.id)}
      >
        <div className="flex items-center gap-2">
          <File className="w-6 h-6 text-primary" />
          <span className="font-medium text-card-foreground">
            {document.name}
          </span>
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => setShowPreview(true)}
              className="p-1 rounded-full hover:bg-secondary"
              aria-label="Preview document"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onStartConnection(document.id)}
              className="p-1 rounded-full hover:bg-secondary"
              aria-label="Create connection"
            >
              <Link className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(document.id);
              }}
              className="p-1 text-destructive rounded-full hover:bg-destructive/10"
              aria-label="Delete document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{document.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <pre className="p-4 bg-muted rounded-lg overflow-auto max-h-96">
              {document.content || "No preview available"}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}