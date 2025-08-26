interface AdminHeaderProps {
    title?: string;
    onLogout: () => void;
    onCreateNew?: () => void;
    showCreateButton?: boolean;
    loading?: boolean;
}
export declare function AdminHeader({ title, onLogout, onCreateNew, showCreateButton, loading, }: AdminHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
