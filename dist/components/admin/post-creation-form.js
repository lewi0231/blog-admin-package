"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import ImageUpload from "../image-upload";
import { Input } from "../input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "../sheet";
import Post from "./post";
const initialFormData = {
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
export function PostCreationForm({ post, onSubmit, onCancel, loading = false, showPreview = true, }) {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);
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
        }
        else {
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
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleImageUpload = (value) => {
        if (typeof value === "function") {
            setFormData(value);
        }
        else {
            setFormData(value);
        }
    };
    return (_jsxs(Card, { className: "mb-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: post ? `Edit Post: ${post.title}` : "Create New Post" }) }), _jsxs(CardContent, { className: "space-y-4", children: [error && (_jsx("div", { className: "rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400", children: error })), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium", children: "Title" }), _jsx(Input, { value: formData.title, onChange: (e) => updateField("title", e.target.value), placeholder: "Post title", disabled: loading })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium", children: "Slug" }), _jsx(Input, { value: formData.slug, onChange: (e) => updateField("slug", e.target.value), placeholder: "post-slug", disabled: loading })] }), _jsx(ImageUpload, { post: formData, setNewPost: handleImageUpload }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium", children: "Content (Markdown)" }), _jsx("textarea", { value: formData.content, onChange: (e) => updateField("content", e.target.value), placeholder: "Write your post in markdown...", className: "min-h-[300px] w-full rounded-md border p-3 font-mono text-sm", disabled: loading })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium", children: "Content Warning" }), _jsx(Input, { value: formData.contentWarning || "", onChange: (e) => updateField("contentWarning", e.target.value), placeholder: "Content warning", disabled: loading })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium", children: "Excerpt" }), _jsx("textarea", { value: formData.excerpt, onChange: (e) => updateField("excerpt", e.target.value), placeholder: "Brief description", className: "min-h-[100px] w-full rounded-md border p-3", disabled: loading })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { onClick: handleSubmit, className: "hover:cursor-pointer", disabled: loading, children: loading ? "Saving..." : post ? "Update Post" : "Create Post" }), showPreview && (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "hover:cursor-pointer", disabled: loading, children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), "Preview"] }) }), _jsxs(SheetContent, { side: "right", className: "px-10 sm:max-w-2/3", children: [_jsx(SheetHeader, { children: _jsx(SheetTitle, { children: "Preview" }) }), _jsx("div", { className: "mt-4 max-h-[calc(100vh-120px)] overflow-y-auto px-4", children: _jsx("div", { className: "prose max-w-none text-gray-800 dark:text-gray-200", children: _jsx(Post, { coverImage: formData.coverImage, content: formData.content, excerpt: formData.excerpt, title: formData.title, slug: formData.slug, contentWarning: formData.contentWarning }) }) })] })] })), _jsx(Button, { variant: "outline", onClick: onCancel, className: "hover:cursor-pointer", disabled: loading, children: "Cancel" })] })] })] }));
}
