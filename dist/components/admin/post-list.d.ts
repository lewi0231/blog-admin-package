import { BlogPost } from "../../lib/types";
interface PostListProps {
    posts: BlogPost[];
    onEdit: (post: BlogPost) => void;
    onTogglePublish: (postId: string, currentStatus: boolean) => Promise<void>;
    onDelete: (postId: string, postTitle: string) => Promise<void>;
    loading?: boolean;
}
export declare function PostList({ posts, onEdit, onTogglePublish, onDelete, loading, }: PostListProps): import("react/jsx-runtime").JSX.Element;
export {};
