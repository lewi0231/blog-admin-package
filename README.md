# Modular Blog Admin System

This is a modular, reusable admin system for blog management that can be easily integrated into different projects.

## Features

- 🔐 **Authentication**: Secure access key-based authentication with session persistence
- 📝 **Post Management**: Create, edit, delete, and publish/unpublish posts
- 🖼️ **Image Upload**: Cloudinary integration for cover images
- 👀 **Live Preview**: Real-time preview of posts while editing
- 🏷️ **Content Warnings**: Optional content warning system
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚙️ **Configurable**: Easy to customize for different needs

## Architecture

### Core Components

```
components/admin/
├── auth-form.tsx          # Authentication form
├── admin-header.tsx       # Header with title and actions
├── post-creation-form.tsx # Post creation/editing form
└── post-list.tsx         # List of all posts with actions

hooks/
├── use-admin-auth.ts     # Authentication logic
└── use-posts.ts         # Post CRUD operations

lib/
├── types.ts             # Shared TypeScript interfaces
└── admin-config.ts      # Configuration system
```

### Key Benefits

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be used independently
3. **Configurability**: Easy to customize via configuration objects
4. **Type Safety**: Full TypeScript support with shared interfaces
5. **Error Handling**: Comprehensive error handling throughout

## Repo File Structure

blog-admin-package/
├── package.json
├── README.md
├── src/
│ ├── components/
│ │ └── admin/
│ │ ├── auth-form.tsx
│ │ ├── admin-header.tsx
│ │ ├── post-creation-form.tsx
│ │ └── post-list.tsx
│ ├── hooks/
│ │ ├── use-admin-auth.ts
│ │ └── use-posts.ts
│ ├── lib/
│ │ ├── types.ts
│ │ └── admin-config.ts
│ └── api/
│ ├── admin/
│ │ └── check-access/
│ │ └── route.ts
│ └── posts/
│ ├── route.ts
│ └── [id]/
│ └── route.ts
├── templates/
│ └── prisma-schema.prisma
└── dist/ (built files)

## Installation

### 1. Copy Required Files

Copy these directories and files to your project:

```
components/admin/
hooks/
lib/types.ts
lib/admin-config.ts
app/api/admin/check-access/route.ts
app/api/posts/route.ts
app/api/posts/[id]/route.ts
```

### 2. Install Dependencies

```bash
npm install lucide-react next-cloudinary
```

### 3. Set Up Environment Variables

```env
ADMIN_ENABLED=true
ADMIN_ACCESS_KEY=your-secure-access-key
DATABASE_URL=your-database-url
```

### 4. Configure Your Admin

```typescript
// app/admin/page.tsx
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { createAdminConfig } from "@/lib/admin-config";

const customConfig = createAdminConfig({
  title: "My Blog Admin",
  features: {
    imageUpload: true,
    preview: true,
    contentWarnings: false,
  },
  cloudinary: {
    uploadPreset: "my-blog-upload",
  },
});

export default function AdminPage() {
  const { isAuthorized, config, login, logout } = useAdminAuth(customConfig);
  // ... rest of your admin page
}
```

## Configuration Options

### Basic Configuration

```typescript
const config = createAdminConfig({
  title: "My Blog Admin",
  authExpiryHours: 12,
  features: {
    imageUpload: true,
    preview: true,
    contentWarnings: true,
    tags: true,
  },
});
```

### Minimal Configuration

```typescript
import { ADMIN_CONFIGS } from "@/lib/admin-config";

const config = ADMIN_CONFIGS.minimal;
```

### Full-Featured Configuration

```typescript
import { ADMIN_CONFIGS } from "@/lib/admin-config";

const config = ADMIN_CONFIGS.full;
```

## Customization

### Adding New Features

1. **Extend the types** in `lib/types.ts`:

```typescript
export interface AdminConfig {
  // ... existing config
  features?: {
    // ... existing features
    myNewFeature?: boolean;
  };
}
```

2. **Update the configuration** in `lib/admin-config.ts`:

```typescript
export const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  // ... existing config
  features: {
    // ... existing features
    myNewFeature: false,
  },
};
```

3. **Create your component** and use the config:

```typescript
export function MyNewFeature({ config }: { config: AdminConfig }) {
  if (!config.features?.myNewFeature) return null;

  return <div>My new feature</div>;
}
```

### Styling

The admin system uses Tailwind CSS classes. You can customize the appearance by:

1. **Modifying the base classes** in the components
2. **Using CSS modules** for component-specific styles
3. **Extending Tailwind config** for custom design tokens

### Database Schema

The admin system expects a Prisma schema with at least:

```prisma
model Post {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique
  content         String
  excerpt         String?
  published       Boolean   @default(false)
  publishedAt     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  coverImage      String?
  contentWarning  String?
  // ... other fields as needed
}
```

## API Endpoints

The admin system expects these API endpoints:

### Authentication

- `GET /api/admin/check-access` - Check if admin is enabled
- `POST /api/admin/check-access` - Validate access key

### Posts

- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create new post
- `PATCH /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## Security Considerations

1. **Access Key**: Use a strong, randomly generated access key
2. **Rate Limiting**: The auth endpoint includes basic rate limiting
3. **Session Management**: Sessions expire after configurable hours
4. **Input Validation**: All inputs are validated on both client and server
5. **SQL Injection**: Use Prisma ORM for safe database operations

## Troubleshooting

### Common Issues

1. **Authentication not working**

   - Check `ADMIN_ENABLED` and `ADMIN_ACCESS_KEY` environment variables
   - Verify the auth endpoint is accessible

2. **Image upload not working**

   - Ensure Cloudinary is configured with correct upload preset
   - Check CORS settings if needed

3. **Posts not loading**
   - Verify database connection and Prisma schema
   - Check API endpoint responses

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

## Contributing

When contributing to this admin system:

1. **Maintain modularity**: Keep components focused and reusable
2. **Add types**: Always define TypeScript interfaces for new features
3. **Update config**: Extend the configuration system for new options
4. **Test thoroughly**: Ensure changes work across different configurations
5. **Document changes**: Update this README for new features

## License

This admin system is designed to be reusable and customizable. Feel free to adapt it for your projects while maintaining the modular architecture.
