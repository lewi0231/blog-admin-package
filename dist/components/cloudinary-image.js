"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CldImage } from "next-cloudinary";
export default function CloudinaryImage({ block, coverImage, title }) {
    const src = block ? block.src : coverImage;
    const alt = block ? block.alt : title;
    return (_jsxs("figure", { className: "mb-4", children: [_jsx(CldImage, { src: src ?? "", alt: alt ?? "", className: "w-full rounded-lg", width: 800, height: 400 }), block?.caption && (_jsx("figcaption", { className: "mt-2 text-center text-sm text-gray-600 dark:text-gray-400", children: block.caption }))] }));
}
