"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useState } from "react";
import { parseMarkdownToBlocks } from "../lib/markdown-parser";
import { cn } from "../lib/utils";
import CloudinaryImage from "./cloudinary-image";
import Mermaid from "./mermaid";
const ContentRenderer = memo(function ContentRenderer({ content, className, }) {
    const [parsedContent, setParsedContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const parseContent = async () => {
            if (!content) {
                setParsedContent([]);
                return;
            }
            if (typeof content === "string") {
                if (content.trim() === "") {
                    setParsedContent([]);
                    return;
                }
                setIsLoading(true);
                try {
                    const blocks = await parseMarkdownToBlocks(content);
                    setParsedContent(blocks);
                }
                catch (error) {
                    console.error("Error parsing markdown:", error);
                    setParsedContent([]);
                }
                finally {
                    setIsLoading(false);
                }
            }
            else {
                setParsedContent(content);
            }
        };
        parseContent();
    }, [content]);
    const renderBlock = (block, index) => {
        switch (block.type) {
            case "heading":
                const headingClasses = cn("font-medium tracking-tight dark:text-gray-300", block.level === 1 && "mb-4 text-3xl", block.level === 2 && "mt-8 mb-3 text-2xl", block.level === 3 && "mt-6 mb-2 text-xl", block.level === 4 && "mt-4 mb-2 text-lg", block.level === 5 && "mt-3 mb-1 text-base", block.level === 6 && "mt-2 mb-1 text-sm");
                switch (block.level) {
                    case 1:
                        return (_jsx("h1", { className: headingClasses, children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }, index));
                    case 2:
                        return (_jsx("h2", { className: headingClasses, children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }, index));
                    case 3:
                        return (_jsx("h3", { className: headingClasses, children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }, index));
                    case 4:
                        return (_jsx("h4", { className: headingClasses, children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }, index));
                    case 5:
                        return (_jsx("h5", { className: headingClasses, children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }, index));
                    case 6:
                        return (_jsx("h6", { className: headingClasses, children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }, index));
                    default:
                        return (_jsx("h2", { className: headingClasses, children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }, index));
                }
            case "paragraph":
                return (_jsx("p", { className: "mb-4 leading-relaxed text-gray-800 dark:text-gray-300", children: _jsx("span", { dangerouslySetInnerHTML: {
                            __html: block.text,
                        } }) }, index));
            case "code":
                if (block.language === "mermaid") {
                    return _jsx(Mermaid, { children: block.code }, index);
                }
                return (_jsx("div", { className: "mb-4", children: _jsx("pre", { className: "overflow-x-auto rounded-lg bg-gray-100 p-4 text-gray-800 dark:bg-gray-800 dark:text-gray-100", children: _jsx("code", { className: `language-${block.language}`, children: block.code }) }) }, index));
            case "list":
                const ListTag = block.ordered ? "ol" : "ul";
                return (_jsx(ListTag, { className: cn("", block.ordered ? "list-decimal" : "list-disc", ""), children: block.items.map((item, itemIndex) => (_jsx("li", { className: "mb-1", children: _jsx("span", { dangerouslySetInnerHTML: {
                                __html: item,
                            } }) }, itemIndex))) }, index));
            case "quote":
                return (_jsxs("blockquote", { className: "mb-4 border-l-4 border-gray-300 pl-4 italic dark:border-gray-600", children: [_jsx("p", { className: "mb-2", children: _jsx("span", { dangerouslySetInnerHTML: {
                                    __html: block.text,
                                } }) }), block.author && (_jsxs("cite", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["\u2014 ", block.author] }))] }, index));
            case "image":
                return _jsx(CloudinaryImage, { block: block }, index);
            case "divider":
                return (_jsx("hr", { className: "my-8 border-gray-300 dark:border-gray-600" }, index));
            default:
                return null;
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: cn("max-w-none", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "mb-4 h-4 rounded bg-gray-200" }), _jsx("div", { className: "mb-4 h-4 w-3/4 rounded bg-gray-200" }), _jsx("div", { className: "mb-4 h-4 w-1/2 rounded bg-gray-200" })] }) }));
    }
    return (_jsx("div", { className: cn("max-w-none", className), children: parsedContent.map((block, index) => renderBlock(block, index)) }));
});
export { ContentRenderer };
