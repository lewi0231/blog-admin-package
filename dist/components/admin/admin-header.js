"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from "lucide-react";
import { Button } from "../button";
export function AdminHeader({ title = "Blog Admin", onLogout, onCreateNew, showCreateButton = true, loading = false, }) {
    return (_jsxs("div", { className: "mb-8 flex items-center justify-between", children: [_jsx("h1", { className: "text-3xl", id: "top", children: title }), _jsxs("div", { className: "flex items-center gap-4", children: [showCreateButton && onCreateNew && (_jsxs(Button, { onClick: onCreateNew, className: "flex items-center gap-2 hover:cursor-pointer", disabled: loading, children: [_jsx(Plus, { className: "h-4 w-4" }), "Create New Post"] })), _jsx(Button, { variant: "outline", onClick: onLogout, className: "flex items-center gap-2 hover:cursor-pointer", disabled: loading, children: "Logout" })] })] }));
}
