import { NextRequest, NextResponse } from 'next/server';
export declare function GET(): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    enabled: boolean;
}>>;
export declare function POST(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    authorized: boolean;
}>>;
