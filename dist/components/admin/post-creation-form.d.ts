import { BlogPost, PostFormData } from "../../lib/types";
interface PostCreationFormProps {
    post?: BlogPost | null;
    onSubmit: (data: PostFormData) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showPreview?: boolean;
}
export declare function PostCreationForm({ post, onSubmit, onCancel, loading, showPreview, }: PostCreationFormProps): import("react/jsx-runtime").JSX.Element;
export {};
