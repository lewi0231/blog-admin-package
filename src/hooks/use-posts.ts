import { useCallback, useState } from "react";
import { BlogPost, PostFormData } from "../lib/types";

export function usePosts(apiEndpoint: string = "/api/posts") {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch posts"
      );
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  const createPost = useCallback(
    async (postData: PostFormData): Promise<BlogPost | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error("Failed to create post");
        }

        const newPost = await response.json();
        setPosts((prev) => [newPost, ...prev]);
        return newPost;
      } catch (error) {
        console.error("Error creating post:", error);
        setError(
          error instanceof Error ? error.message : "Failed to create post"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint]
  );

  const updatePost = useCallback(
    async (
      postId: string,
      postData: Partial<PostFormData>
    ): Promise<BlogPost | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiEndpoint}/${postId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error("Failed to update post");
        }

        const updatedPost = await response.json();
        setPosts((prev) =>
          prev.map((post) => (post.id === postId ? updatedPost : post))
        );
        return updatedPost;
      } catch (error) {
        console.error("Error updating post:", error);
        setError(
          error instanceof Error ? error.message : "Failed to update post"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint]
  );

  const togglePublishStatus = useCallback(
    async (postId: string, currentStatus: boolean): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiEndpoint}/${postId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            published: !currentStatus,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update post status");
        }

        const updatedPost = await response.json();
        setPosts((prev) =>
          prev.map((post) => (post.id === postId ? updatedPost : post))
        );
        return true;
      } catch (error) {
        console.error("Error updating post status:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to update post status"
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint]
  );

  const deletePost = useCallback(
    async (postId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiEndpoint}/${postId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        setPosts((prev) => prev.filter((post) => post.id !== postId));
        return true;
      } catch (error) {
        console.error("Error deleting post:", error);
        setError(
          error instanceof Error ? error.message : "Failed to delete post"
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint]
  );

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    togglePublishStatus,
    deletePost,
  };
}
