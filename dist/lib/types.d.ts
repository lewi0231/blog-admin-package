export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    published: boolean;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    layout: string;
    featured: boolean;
    coverImage?: string;
    metaTitle?: string;
    metaDescription?: string;
    contentWarning?: string;
    tags: string[];
    customFields?: Record<string, unknown>;
    authorId?: string;
    author?: {
        id: string;
        name?: string;
        email: string;
        avatar?: string;
        bio?: string;
    };
}
export interface PostFormData {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    contentWarning?: string;
    published?: boolean;
    layout?: string;
    featured?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    tags?: string[];
    customFields?: Record<string, unknown>;
}
export interface AdminConfig {
    authEnabled: boolean;
    authKey?: string;
    authExpiryHours?: number;
    apiBaseUrl?: string;
    postsEndpoint?: string;
    authEndpoint?: string;
    title?: string;
    logo?: string;
    theme?: 'light' | 'dark' | 'auto';
    features?: {
        imageUpload?: boolean;
        preview?: boolean;
        contentWarnings?: boolean;
        tags?: boolean;
        customFields?: boolean;
        authors?: boolean;
    };
    cloudinary: {
        uploadPreset: string;
        maxFileSize?: number;
        allowedFormats?: string[];
    };
}
export interface AdminContextValue {
    isAuthorized: boolean;
    isLoading: boolean;
    config: AdminConfig;
    login: (accessKey: string) => Promise<boolean>;
    logout: () => void;
}
