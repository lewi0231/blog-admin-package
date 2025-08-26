import { BlogPost } from "../lib/types";
import { ContentBlock } from "./content-renderer";
type Props = {
    block?: Extract<ContentBlock, {
        type: "image";
    }>;
    coverImage?: BlogPost["coverImage"];
    title?: BlogPost["title"];
};
export default function CloudinaryImage({ block, coverImage, title }: Props): import("react/jsx-runtime").JSX.Element;
export {};
