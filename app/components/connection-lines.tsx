"use client";

import { Connection, Document } from "@/types/document";

interface ConnectionLinesProps {
  documents: Document[];
  connections: Connection[];
}

export function ConnectionLines({ documents, connections }: ConnectionLinesProps) {
  return (
    <svg className="absolute inset-0 pointer-events-none">
      {connections.map((connection) => {
        const fromDoc = documents.find((d) => d.id === connection.from);
        const toDoc = documents.find((d) => d.id === connection.to);

        if (!fromDoc || !toDoc) return null;

        const fromX = fromDoc.position.x + 150;
        const fromY = fromDoc.position.y + 32;
        const toX = toDoc.position.x + 150;
        const toY = toDoc.position.y + 32;

        return (
          <g key={`${connection.from}-${connection.to}`}>
            <line
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4"
            />
            <circle
              cx={fromX}
              cy={fromY}
              r="4"
              fill="hsl(var(--primary))"
            />
            <circle
              cx={toX}
              cy={toY}
              r="4"
              fill="hsl(var(--primary))"
            />
          </g>
        );
      })}
    </svg>
  );
}