import { SetStateAction } from 'react';
type Props = {
    post: {
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        coverImage: string;
    };
    setNewPost: (value: SetStateAction<{
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        coverImage: string;
    }>) => void;
};
export default function ImageUpload({ post, setNewPost }: Props): import("react/jsx-runtime").JSX.Element;
export {};
