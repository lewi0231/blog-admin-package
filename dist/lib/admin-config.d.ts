import { AdminConfig } from './types';
export declare const DEFAULT_ADMIN_CONFIG: AdminConfig;
export declare function createAdminConfig(customConfig?: Partial<AdminConfig>): AdminConfig;
export declare const ADMIN_CONFIGS: {
    minimal: AdminConfig;
    full: AdminConfig;
    custom: (overrides: Partial<AdminConfig>) => AdminConfig;
};
