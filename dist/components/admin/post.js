import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BlogDate } from "../blog-date";
import CloudinaryImage from "../cloudinary-image";
import { ContentRenderer } from "../content-renderer";
export function Post({ content, publishedAt, slug, coverImage, title, excerpt, contentWarning, }) {
    return (_jsxs("article", { className: "prose prose-lg max-w-none", children: [_jsx("h1", { className: "mb-1 text-3xl font-light text-gray-800 dark:text-gray-300", children: title }), publishedAt && _jsx(BlogDate, { date: publishedAt }), coverImage && (_jsx(CloudinaryImage, { coverImage: coverImage, title: title }, slug)), excerpt && (_jsxs("p", { className: "mb-8 text-lg text-gray-700 dark:text-gray-300", children: [excerpt, " ", _jsx("br", {}), _jsx("span", { className: "italic", children: contentWarning ?? "" })] })), _jsx(ContentRenderer, { content: content })] }));
}
export default Post;
