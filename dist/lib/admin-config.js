// Default configuration that can be overridden
export const DEFAULT_ADMIN_CONFIG = {
    // Authentication
    authEnabled: true,
    authExpiryHours: 24,
    // API endpoints
    apiBaseUrl: '/api',
    postsEndpoint: '/api/posts',
    authEndpoint: '/api/admin/check-access',
    // UI customization
    title: 'Blog Admin',
    logo: undefined,
    theme: 'auto',
    // Features
    features: {
        imageUpload: true,
        preview: true,
        contentWarnings: true,
        tags: true,
        customFields: false,
        authors: false,
    },
    // External services
    cloudinary: {
        uploadPreset: 'personal-blog',
        maxFileSize: 10000000, // 10MB
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
};
// Function to merge custom config with defaults
export function createAdminConfig(customConfig = {}) {
    return {
        ...DEFAULT_ADMIN_CONFIG,
        ...customConfig,
        features: {
            ...DEFAULT_ADMIN_CONFIG.features,
            ...customConfig.features,
        },
        cloudinary: {
            ...DEFAULT_ADMIN_CONFIG.cloudinary,
            ...customConfig.cloudinary,
        },
    };
}
// Example configurations for different use cases
export const ADMIN_CONFIGS = {
    // Minimal config for simple blogs
    minimal: createAdminConfig({
        title: 'Simple Blog Admin',
        features: {
            imageUpload: false,
            preview: false,
            contentWarnings: false,
            tags: false,
            customFields: false,
            authors: false,
        },
    }),
    // Full-featured config for complex blogs
    full: createAdminConfig({
        title: 'Advanced Blog Admin',
        features: {
            imageUpload: true,
            preview: true,
            contentWarnings: true,
            tags: true,
            customFields: true,
            authors: true,
        },
    }),
    // Custom config for specific needs
    custom: (overrides) => createAdminConfig(overrides),
};
