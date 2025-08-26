"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Edit, Eye, EyeOff, MoreHorizontal, Trash2 } from "lucide-react";
import { BlogDate } from "../blog-date";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../drop-down-menu";
export function PostList({ posts, onEdit, onTogglePublish, onDelete, loading = false, }) {
    const handleDelete = async (post) => {
        if (!confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
            return;
        }
        await onDelete(post.id, post.title);
    };
    if (loading) {
        return (_jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => (_jsx(Card, { className: "relative py-0", children: _jsx(CardContent, { className: "px-4 py-4", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "mb-2 h-4 w-3/4 rounded bg-gray-200" }), _jsx("div", { className: "mb-2 h-3 w-1/2 rounded bg-gray-200" }), _jsx("div", { className: "h-3 w-1/4 rounded bg-gray-200" })] }) }) }, i))) }));
    }
    if (posts.length === 0) {
        return (_jsx("div", { className: "py-8 text-center text-gray-500", children: "No posts found. Create your first post to get started." }));
    }
    return (_jsx("div", { className: "space-y-4", children: posts.map((post) => (_jsx(Card, { className: "relative py-0", children: _jsx(CardContent, { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold", children: post.title }), _jsx("p", { className: "text-sm text-gray-600", children: post.excerpt }), _jsx(BlogDate, { date: post.createdAt })] }), _jsx("div", { className: "absolute top-4 right-4", children: _jsx("span", { className: `rounded px-2 py-1 text-xs ${post.published
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"}`, children: post.published ? "Published" : "Draft" }) }), _jsx("div", { className: "ml-4", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", className: "hover:cursor-pointer", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: () => onEdit(post), className: "hover:cursor-pointer", children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit"] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: () => onTogglePublish(post.id, post.published), className: "hover:cursor-pointer", children: post.published ? (_jsxs(_Fragment, { children: [_jsx(EyeOff, { className: "mr-2 h-4 w-4" }), "Unpublish"] })) : (_jsxs(_Fragment, { children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), "Publish"] })) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: () => handleDelete(post), className: "text-red-600 hover:cursor-pointer focus:text-red-600", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"] })] })] }) })] }) }) }, post.id))) }));
}
