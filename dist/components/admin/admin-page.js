"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAdminAuth } from "../../hooks/use-admin-auth";
import { usePosts } from "../../hooks/use-posts";
import { Separator } from "../separator";
import { AdminHeader } from "./admin-header";
import { AuthForm } from "./auth-form";
import { PostCreationForm } from "./post-creation-form";
import { PostList } from "./post-list";
export default function AdminPage() {
    const { isAuthorized, isLoading: authLoading, config, login, logout, } = useAdminAuth();
    const { posts, loading: postsLoading, error: postsError, fetchPosts, createPost, updatePost, togglePublishStatus, deletePost, } = usePosts(config.postsEndpoint);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    useEffect(() => {
        if (isAuthorized) {
            fetchPosts();
        }
    }, [isAuthorized, fetchPosts]);
    const handleLogin = async (accessKey) => {
        try {
            await login(accessKey);
            return true;
        }
        catch (error) {
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
    const handleEditPost = (post) => {
        setEditingPost(post);
        setShowCreateForm(true);
        // Scroll to top
        setTimeout(() => {
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };
    const handleFormSubmit = async (data) => {
        if (editingPost) {
            await updatePost(editingPost.id, data);
        }
        else {
            await createPost(data);
        }
        setShowCreateForm(false);
        setEditingPost(null);
    };
    const handleFormCancel = () => {
        setShowCreateForm(false);
        setEditingPost(null);
    };
    const handleTogglePublish = async (postId, currentStatus) => {
        await togglePublishStatus(postId, currentStatus);
    };
    const handleDeletePost = async (postId, _postTitle) => {
        await deletePost(postId);
    };
    const handleLogout = () => {
        logout();
        setShowCreateForm(false);
        setEditingPost(null);
    };
    if (authLoading) {
        return _jsx("div", { className: "p-8", children: "Loading..." });
    }
    if (!isAuthorized) {
        return _jsx(AuthForm, { onLogin: handleLogin, title: config.title });
    }
    return (_jsxs("div", { className: "container mx-auto px-8", children: [_jsx(AdminHeader, { title: config.title, onLogout: handleLogout, onCreateNew: handleCreateNewPost, showCreateButton: !showCreateForm, loading: postsLoading }), showCreateForm && (_jsx(PostCreationForm, { post: editingPost, onSubmit: handleFormSubmit, onCancel: handleFormCancel, loading: postsLoading, showPreview: config.features?.preview })), _jsx(Separator, { className: "my-8" }), _jsxs("div", { children: [_jsx("h2", { className: "mb-4 text-2xl font-bold", children: "All Posts" }), postsError && (_jsx("div", { className: "mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400", children: postsError })), _jsx(PostList, { posts: posts, onEdit: handleEditPost, onTogglePublish: handleTogglePublish, onDelete: handleDeletePost, loading: postsLoading })] })] }));
}
