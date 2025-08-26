import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Upload } from 'lucide-react';
import { CldUploadButton, } from 'next-cloudinary';
import Image from 'next/image';
export default function ImageUpload({ post, setNewPost }) {
    const handleUploadSuccess = (result) => {
        console.debug('Cloudinary Upload Result:', result);
        // The result contains the uploaded image URL
        if (typeof result?.info === 'string')
            return;
        if (result?.info?.secure_url) {
            const imageUrl = result.info.secure_url;
            setNewPost((prevPost) => ({ ...prevPost, coverImage: imageUrl }));
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: _jsxs(CldUploadButton, { uploadPreset: "personal-blog", onSuccess: handleUploadSuccess, options: {
                        maxFiles: 1,
                        resourceType: 'image',
                        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                        maxFileSize: 10000000, // 10MB
                    }, className: "bg-primary text-primary-foreground hover:bg-primary/90 mt-4 mb-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium", children: ["Cover Image ", _jsx(Upload, { className: "ml-2" })] }) }), post.coverImage && (_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium", children: "Preview" }), _jsx(Image, { src: post.coverImage, alt: "Cover preview", width: 400, height: 200, className: "h-32 w-auto rounded-md border object-cover" })] }))] }));
}
