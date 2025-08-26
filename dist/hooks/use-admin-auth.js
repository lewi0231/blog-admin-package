import { useEffect, useState } from "react";
const DEFAULT_CONFIG = {
    authEnabled: true,
    authExpiryHours: 24,
    apiBaseUrl: "/api",
    postsEndpoint: "/api/posts",
    authEndpoint: "/api/admin/check-access",
    title: "Blog Admin",
    features: {
        imageUpload: true,
        preview: true,
        contentWarnings: true,
        tags: true,
        customFields: false,
        authors: false,
    },
    cloudinary: {
        uploadPreset: "personal-blog",
        maxFileSize: 10000000, // 10MB
        allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    },
};
export function useAdminAuth(config = {}) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    useEffect(() => {
        // Check for persisted admin access
        const persistedAuth = localStorage.getItem("admin_authorized");
        const authTimestamp = localStorage.getItem("admin_auth_timestamp");
        if (persistedAuth === "true" && authTimestamp) {
            const timestamp = parseInt(authTimestamp);
            const now = Date.now();
            const authValidFor = (mergedConfig.authExpiryHours || 24) * 60 * 60 * 1000;
            if (now - timestamp < authValidFor) {
                setIsAuthorized(true);
                setIsLoading(false);
                return;
            }
            else {
                // Clear expired auth
                localStorage.removeItem("admin_authorized");
                localStorage.removeItem("admin_auth_timestamp");
            }
        }
        const checkIfEnabled = async () => {
            try {
                const response = await fetch(mergedConfig.authEndpoint);
                if (!response.ok) {
                    console.warn("Admin access is disabled");
                }
            }
            catch (error) {
                console.error("Access check failed:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        checkIfEnabled();
    }, [mergedConfig.authEndpoint, mergedConfig.authExpiryHours]);
    const login = async (accessKey) => {
        // Client-side validation
        if (!accessKey.trim()) {
            throw new Error("Please enter an access key");
        }
        if (accessKey.length < 8) {
            throw new Error("Access key must be at least 8 characters long");
        }
        try {
            const response = await fetch(mergedConfig.authEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessKey }),
            });
            if (response.ok) {
                setIsAuthorized(true);
                // Persist authorization with timestamp
                localStorage.setItem("admin_authorized", "true");
                localStorage.setItem("admin_auth_timestamp", Date.now().toString());
                return true;
            }
            else {
                throw new Error("Invalid access key");
            }
        }
        catch (error) {
            console.error("Access check failed:", error);
            throw error;
        }
    };
    const logout = () => {
        setIsAuthorized(false);
        localStorage.removeItem("admin_authorized");
        localStorage.removeItem("admin_auth_timestamp");
    };
    return {
        isAuthorized,
        isLoading,
        config: mergedConfig,
        login,
        logout,
    };
}
