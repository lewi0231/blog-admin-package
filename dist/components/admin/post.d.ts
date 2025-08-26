import { BlogPost } from "../../lib/types";
type PostProps = {
    content: BlogPost["content"];
    publishedAt?: BlogPost["publishedAt"];
    slug: BlogPost["slug"];
    coverImage?: BlogPost["coverImage"];
    title: BlogPost["title"];
    excerpt: BlogPost["excerpt"];
    contentWarning: BlogPost["contentWarning"];
};
export declare function Post({ content, publishedAt, slug, coverImage, title, excerpt, contentWarning, }: PostProps): import("react/jsx-runtime").JSX.Element;
export default Post;
