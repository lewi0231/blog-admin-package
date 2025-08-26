# Blog Admin Package

A modular blog admin system for Next.js applications. This package provides a complete admin interface for managing blog posts with authentication, post creation/editing, and content rendering.

## Features

- 🔐 **Authentication**: Secure admin access with configurable access keys
- ✍️ **Post Management**: Create, edit, delete, and publish blog posts
- 🎨 **Content Rendering**: Markdown support with syntax highlighting and Mermaid diagrams
- 📸 **Image Upload**: Cloudinary integration for image management
- 🎯 **Customizable**: Configurable endpoints, themes, and features
- 📱 **Responsive**: Mobile-friendly admin interface
- 🔧 **TypeScript**: Full TypeScript support with type definitions

## Installation

### Prerequisites

Your Next.js project must have these peer dependencies installed:

```bash
npm install next react react-dom
npm install @radix-ui/react-slot @radix-ui/react-dropdown-menu @radix-ui/react-separator @radix-ui/react-dialog
npm install lucide-react clsx tailwind-merge class-variance-authority
npm install next-cloudinary
```

### Install the Package

```bash
npm install @your-org/blog-admin
```

## Quick Start

### 1. Create an Admin Page

Create a new page in your Next.js app (e.g., `app/admin/page.tsx`):

```tsx
import { AdminPage } from "@your-org/blog-admin";

export default function Admin() {
  return <AdminPage />;
}
```

### 2. Set Up Environment Variables

Add these to your `.env.local`:

```env
ADMIN_ENABLED=true
ADMIN_ACCESS_KEY=your-secure-access-key-here
```

### 3. Create API Routes

The package expects these API endpoints. Create them in your Next.js app:

#### Authentication Route (`app/api/admin/check-access/route.ts`)

```tsx
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const adminEnabled = process.env.ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    return NextResponse.json({ enabled: false }, { status: 403 });
  }

  return NextResponse.json({ enabled: true });
}

export async function POST(request: NextRequest) {
  const { accessKey } = await request.json();
  const adminKey = process.env.ADMIN_ACCESS_KEY;

  if (accessKey === adminKey) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
```

#### Posts API Route (`app/api/posts/route.ts`)

```tsx
import { NextRequest, NextResponse } from "next/server";

// Your posts database logic here
export async function GET() {
  // Return array of blog posts
  return NextResponse.json([]);
}

export async function POST(request: NextRequest) {
  const postData = await request.json();
  // Create new post logic here
  return NextResponse.json({ id: "new-post-id", ...postData });
}
```

## Configuration

### Basic Configuration

```tsx
import { AdminPage } from '@your-org/blog-admin'

export default function Admin() {
  return (
    <AdminPage
      config={{
        title: "My Blog Admin",
        postsEndpoint: "/api/my-posts",
        authEndpoint: "/api/admin/check-access",
        cloudinary: {
          uploadPreset: "my-blog-preset"
        }
      }}
    />
  />
}
```

### Advanced Configuration

```tsx
import { AdminPage } from "@your-org/blog-admin";

const config = {
  // Authentication
  authEnabled: true,
  authExpiryHours: 24,

  // API endpoints
  apiBaseUrl: "/api",
  postsEndpoint: "/api/posts",
  authEndpoint: "/api/admin/check-access",

  // UI customization
  title: "My Blog Admin",
  logo: "/admin-logo.png",
  theme: "dark" as const,

  // Features
  features: {
    imageUpload: true,
    preview: true,
    contentWarnings: true,
    tags: true,
    customFields: false,
    authors: false,
  },

  // Cloudinary settings
  cloudinary: {
    uploadPreset: "my-blog-preset",
    maxFileSize: 10000000, // 10MB
    allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
  },
};

export default function Admin() {
  return <AdminPage config={config} />;
}
```

## API Reference

### Components

#### `AdminPage`

Main admin page component.

**Props:**

- `config?: Partial<AdminConfig>` - Configuration object

#### `AdminHeader`

Header component with title and action buttons.

**Props:**

- `title?: string` - Admin title
- `onLogout: () => void` - Logout handler
- `onCreateNew?: () => void` - Create new post handler
- `showCreateButton?: boolean` - Show create button
- `loading?: boolean` - Loading state

#### `AuthForm`

Authentication form component.

**Props:**

- `onLogin: (accessKey: string) => Promise<boolean>` - Login handler
- `title?: string` - Form title
- `loading?: boolean` - Loading state

#### `PostCreationForm`

Form for creating and editing posts.

**Props:**

- `post?: BlogPost | null` - Post to edit (null for new post)
- `onSubmit: (data: PostFormData) => Promise<void>` - Submit handler
- `onCancel: () => void` - Cancel handler
- `loading?: boolean` - Loading state
- `showPreview?: boolean` - Show preview button

#### `PostList`

List of blog posts with actions.

**Props:**

- `posts: BlogPost[]` - Array of posts
- `onEdit: (post: BlogPost) => void` - Edit handler
- `onTogglePublish: (postId: string, currentStatus: boolean) => Promise<void>` - Toggle publish handler
- `onDelete: (postId: string, postTitle: string) => Promise<void>` - Delete handler
- `loading?: boolean` - Loading state

### Hooks

#### `useAdminAuth(config?: Partial<AdminConfig>)`

Hook for admin authentication state.

**Returns:**

- `isAuthorized: boolean` - Whether user is authenticated
- `isLoading: boolean` - Loading state
- `config: AdminConfig` - Merged configuration
- `login: (accessKey: string) => Promise<boolean>` - Login function
- `logout: () => void` - Logout function

#### `usePosts(apiEndpoint?: string)`

Hook for managing blog posts.

**Returns:**

- `posts: BlogPost[]` - Array of posts
- `loading: boolean` - Loading state
- `error: string | null` - Error message
- `fetchPosts: () => Promise<void>` - Fetch posts function
- `createPost: (data: PostFormData) => Promise<BlogPost | null>` - Create post function
- `updatePost: (postId: string, data: Partial<PostFormData>) => Promise<BlogPost | null>` - Update post function
- `togglePublishStatus: (postId: string, currentStatus: boolean) => Promise<boolean>` - Toggle publish function
- `deletePost: (postId: string) => Promise<boolean>` - Delete post function

### Types

#### `BlogPost`

```tsx
interface BlogPost {
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
```

#### `AdminConfig`

```tsx
interface AdminConfig {
  authEnabled: boolean;
  authKey?: string;
  authExpiryHours?: number;
  apiBaseUrl?: string;
  postsEndpoint?: string;
  authEndpoint?: string;
  title?: string;
  logo?: string;
  theme?: "light" | "dark" | "auto";
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
```

## Styling

The package uses Tailwind CSS classes. Make sure your project has Tailwind configured and includes the necessary CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Customization

### Custom Content Renderer

You can provide a custom content renderer by passing it to the `PostCreationForm`:

```tsx
import { PostCreationForm } from "@your-org/blog-admin";

function CustomRenderer({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

<PostCreationForm
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  renderContent={CustomRenderer}
/>;
```

### Custom Themes

The package supports light, dark, and auto themes. You can customize the appearance by overriding Tailwind classes in your global CSS.

## Development

### Building the Package

```bash
npm run build
```

### Publishing

```bash
npm publish
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
