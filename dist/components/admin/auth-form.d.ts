interface AuthFormProps {
    onLogin: (accessKey: string) => Promise<boolean>;
    title?: string;
    loading?: boolean;
}
export declare function AuthForm({ onLogin, title, loading, }: AuthFormProps): import("react/jsx-runtime").JSX.Element;
export {};
