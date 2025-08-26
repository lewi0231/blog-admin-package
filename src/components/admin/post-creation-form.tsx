"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogPost, PostFormData } from "../../lib/types";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import ImageUpload from "../image-upload";
import { Input } from "../input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import Post from "./post";

interface PostCreationFormProps {
  post?: BlogPost | null;
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  showPreview?: boolean;
}

const initialFormData: PostFormData = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  coverImage: "",
  contentWarning: "",
  published: false,
  layout: "default",
  featured: false,
  tags: [],
};

export function PostCreationForm({
  post,
  onSubmit,
  onCancel,
  loading = false,
  showPreview = true,
}: PostCreationFormProps) {
  const [formData, setFormData] = useState<PostFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || "",
        coverImage: post.coverImage || "",
        contentWarning: post.contentWarning || "",
        published: post.published,
        layout: post.layout,
        featured: post.featured,
        tags: post.tags,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        customFields: post.customFields,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [post]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.slug.trim()) {
      setError("Slug is required");
      return;
    }

    if (!formData.content.trim()) {
      setError("Content is required");
      return;
    }

    setError(null);
    await onSubmit(formData);
  };

  const updateField = (
    field: keyof PostFormData,
    value: string | boolean | string[] | Record<string, unknown>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (
    value: PostFormData | ((prev: PostFormData) => PostFormData)
  ) => {
    if (typeof value === "function") {
      setFormData(value);
    } else {
      setFormData(value);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {post ? `Edit Post: ${post.title}` : "Create New Post"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Post title"
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="post-slug"
            disabled={loading}
          />
        </div>

        <ImageUpload post={formData} setNewPost={handleImageUpload} />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Content (Markdown)
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => updateField("content", e.target.value)}
            placeholder="Write your post in markdown..."
            className="min-h-[300px] w-full rounded-md border p-3 font-mono text-sm"
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Content Warning
          </label>
          <Input
            value={formData.contentWarning || ""}
            onChange={(e) => updateField("contentWarning", e.target.value)}
            placeholder="Content warning"
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            placeholder="Brief description"
            className="min-h-[100px] w-full rounded-md border p-3"
            disabled={loading}
          />
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleSubmit}
            className="hover:cursor-pointer"
            disabled={loading}
          >
            {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>

          {showPreview && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:cursor-pointer"
                  disabled={loading}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="px-10 sm:max-w-2/3">
                <SheetHeader>
                  <SheetTitle>Preview</SheetTitle>
                </SheetHeader>
                <div className="mt-4 max-h-[calc(100vh-120px)] overflow-y-auto px-4">
                  <div className="prose max-w-none text-gray-800 dark:text-gray-200">
                    <Post
                      coverImage={formData.coverImage}
                      content={formData.content}
                      excerpt={formData.excerpt}
                      title={formData.title}
                      slug={formData.slug}
                      contentWarning={formData.contentWarning}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Button
            variant="outline"
            onClick={onCancel}
            className="hover:cursor-pointer"
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
