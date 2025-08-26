export type ContentBlock = {
    type: "heading";
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
} | {
    type: "paragraph";
    text: string;
} | {
    type: "code";
    language: string;
    code: string;
} | {
    type: "list";
    ordered: boolean;
    items: string[];
} | {
    type: "quote";
    text: string;
    author?: string;
} | {
    type: "image";
    src: string;
    alt: string;
    caption?: string;
} | {
    type: "divider";
};
interface ContentRendererProps {
    content: ContentBlock[] | string;
    className?: string;
}
declare const ContentRenderer: import("react").NamedExoticComponent<ContentRendererProps>;
export { ContentRenderer };
