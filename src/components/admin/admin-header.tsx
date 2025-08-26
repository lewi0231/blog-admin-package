"use client";

import { Plus } from "lucide-react";
import { Button } from "../button";

interface AdminHeaderProps {
  title?: string;
  onLogout: () => void;
  onCreateNew?: () => void;
  showCreateButton?: boolean;
  loading?: boolean;
}

export function AdminHeader({
  title = "Blog Admin",
  onLogout,
  onCreateNew,
  showCreateButton = true,
  loading = false,
}: AdminHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl" id="top">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        {showCreateButton && onCreateNew && (
          <Button
            onClick={onCreateNew}
            className="flex items-center gap-2 hover:cursor-pointer"
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onLogout}
          className="flex items-center gap-2 hover:cursor-pointer"
          disabled={loading}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
