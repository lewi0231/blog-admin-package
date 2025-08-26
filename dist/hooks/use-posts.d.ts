import { BlogPost, PostFormData } from "../lib/types";
export declare function usePosts(apiEndpoint?: string): {
    posts: BlogPost[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    createPost: (postData: PostFormData) => Promise<BlogPost | null>;
    updatePost: (postId: string, postData: Partial<PostFormData>) => Promise<BlogPost | null>;
    togglePublishStatus: (postId: string, currentStatus: boolean) => Promise<boolean>;
    deletePost: (postId: string) => Promise<boolean>;
};
