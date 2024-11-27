"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ToolbarProps {
  onSearch: (query: string) => void;
}

export function Toolbar({ onSearch }: ToolbarProps) {
  return (
    <div className="flex items-center gap-4 mb-4 p-4 bg-card rounded-lg">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search documents..."
          className="pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}