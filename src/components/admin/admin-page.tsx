"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "../../hooks/use-admin-auth";
import { usePosts } from "../../hooks/use-posts";
import { BlogPost, PostFormData } from "../../lib/types";
import { Separator } from "../separator";
import { AdminHeader } from "./admin-header";
import { AuthForm } from "./auth-form";
import { PostCreationForm } from "./post-creation-form";
import { PostList } from "./post-list";

export default function AdminPage() {
  const {
    isAuthorized,
    isLoading: authLoading,
    config,
    login,
    logout,
  } = useAdminAuth();
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    fetchPosts,
    createPost,
    updatePost,
    togglePublishStatus,
    deletePost,
  } = usePosts(config.postsEndpoint);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (isAuthorized) {
      fetchPosts();
    }
  }, [isAuthorized, fetchPosts]);

  const handleLogin = async (accessKey: string): Promise<boolean> => {
    try {
      await login(accessKey);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const handleCreateNewPost = () => {
    setShowCreateForm(true);
    setEditingPost(null);
    // Scroll to top
    setTimeout(() => {
      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowCreateForm(true);
    // Scroll to top
    setTimeout(() => {
      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleFormSubmit = async (data: PostFormData) => {
    if (editingPost) {
      await updatePost(editingPost.id, data);
    } else {
      await createPost(data);
    }
    setShowCreateForm(false);
    setEditingPost(null);
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingPost(null);
  };

  const handleTogglePublish = async (
    postId: string,
    currentStatus: boolean
  ) => {
    await togglePublishStatus(postId, currentStatus);
  };

  const handleDeletePost = async (postId: string, _postTitle: string) => {
    await deletePost(postId);
  };

  const handleLogout = () => {
    logout();
    setShowCreateForm(false);
    setEditingPost(null);
  };

  if (authLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!isAuthorized) {
    return <AuthForm onLogin={handleLogin} title={config.title} />;
  }

  return (
    <div className="container mx-auto px-8">
      <AdminHeader
        title={config.title}
        onLogout={handleLogout}
        onCreateNew={handleCreateNewPost}
        showCreateButton={!showCreateForm}
        loading={postsLoading}
      />

      {/* Create/Edit Post Form */}
      {showCreateForm && (
        <PostCreationForm
          post={editingPost}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={postsLoading}
          showPreview={config.features?.preview}
        />
      )}

      <Separator className="my-8" />

      {/* All Posts */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">All Posts</h2>
        {postsError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {postsError}
          </div>
        )}
        <PostList
          posts={posts}
          onEdit={handleEditPost}
          onTogglePublish={handleTogglePublish}
          onDelete={handleDeletePost}
          loading={postsLoading}
        />
      </div>
    </div>
  );
}
