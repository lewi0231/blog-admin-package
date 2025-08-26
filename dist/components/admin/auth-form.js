"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
export function AuthForm({ onLogin, title = "Admin Access", loading = false, }) {
    const [accessKey, setAccessKey] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async () => {
        if (!accessKey.trim()) {
            setError("Please enter an access key");
            return;
        }
        if (accessKey.length < 8) {
            setError("Access key must be at least 8 characters long");
            return;
        }
        setIsSubmitting(true);
        setError(null);
        try {
            const success = await onLogin(accessKey);
            if (!success) {
                setError("Invalid access key");
            }
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    return (_jsx("div", { className: "container mx-auto px-8 py-16", children: _jsxs(Card, { className: "mx-auto max-w-md", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: title }) }), _jsxs(CardContent, { className: "space-y-4", children: [error && (_jsx("div", { className: "rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400", children: error })), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium", children: "Access Key" }), _jsx(Input, { type: "password", value: accessKey, onChange: (e) => setAccessKey(e.target.value), onKeyPress: handleKeyPress, placeholder: "Enter access key", disabled: isSubmitting || loading })] }), _jsx(Button, { onClick: handleSubmit, className: "w-full", disabled: isSubmitting || loading, children: isSubmitting ? "Authenticating..." : "Access Admin" })] })] }) }));
}
