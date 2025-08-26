"use client";

import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";

interface AuthFormProps {
  onLogin: (accessKey: string) => Promise<boolean>;
  title?: string;
  loading?: boolean;
}

export function AuthForm({
  onLogin,
  title = "Admin Access",
  loading = false,
}: AuthFormProps) {
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!accessKey.trim()) {
      setError("Please enter an access key");
      return;
    }

    if (accessKey.length < 8) {
      setError("Access key must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const success = await onLogin(accessKey);
      if (!success) {
        setError("Invalid access key");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container mx-auto px-8 py-16">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-medium">Access Key</label>
            <Input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter access key"
              disabled={isSubmitting || loading}
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Authenticating..." : "Access Admin"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
