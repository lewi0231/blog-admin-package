"use client";

import { Edit, Eye, EyeOff, MoreHorizontal, Trash2 } from "lucide-react";
import { BlogPost } from "../../lib/types";
import { BlogDate } from "../blog-date";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../drop-down-menu";

interface PostListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onTogglePublish: (postId: string, currentStatus: boolean) => Promise<void>;
  onDelete: (postId: string, postTitle: string) => Promise<void>;
  loading?: boolean;
}

export function PostList({
  posts,
  onEdit,
  onTogglePublish,
  onDelete,
  loading = false,
}: PostListProps) {
  const handleDelete = async (post: BlogPost) => {
    if (
      !confirm(
        `Are you sure you want to delete "${post.title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    await onDelete(post.id, post.title);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="relative py-0">
            <CardContent className="px-4 py-4">
              <div className="animate-pulse">
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="mb-2 h-3 w-1/2 rounded bg-gray-200"></div>
                <div className="h-3 w-1/4 rounded bg-gray-200"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No posts found. Create your first post to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="relative py-0">
          <CardContent className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <BlogDate date={post.createdAt} />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`rounded px-2 py-1 text-xs ${
                    post.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>

              {/* Actions Dropdown */}
              <div className="ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onEdit(post)}
                      className="hover:cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onTogglePublish(post.id, post.published)}
                      className="hover:cursor-pointer"
                    >
                      {post.published ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Publish
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(post)}
                      className="text-red-600 hover:cursor-pointer focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
