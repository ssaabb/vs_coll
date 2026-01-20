import { NextRequest, NextResponse } from 'next/server';
import { gitService } from '@/lib/git';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Force dynamic since we read file system
export const dynamic = 'force-dynamic';

const ROOT_DIR = path.resolve(process.cwd(), '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const filePath = searchParams.get('path');

    if (!filePath) {
        return NextResponse.json({ error: 'Path required' }, { status: 400 });
    }

    // Security check: prevent directory traversal
    if (filePath.includes('..')) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    try {
        const fullPath = path.join(CONTENT_DIR, filePath);
        const fileContent = await fs.readFile(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Get git history
        await gitService.init(); // Ensure repo is ready
        const log = await gitService.getLog(filePath);

        return NextResponse.json({
            content,
            frontmatter: data,
            history: log?.latest || null
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { path: filePath, content, message } = body;

        if (!filePath || !content) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const commitMsg = message || `docs: update ${path.basename(filePath)} via web`;

        try {
            await gitService.saveFile(filePath, content, commitMsg);
            return NextResponse.json({ success: true, message: 'Saved and Committed' });
        } catch (e: any) {
            // Check if it's our "Saved but Git failed" error
            if (e.message.includes('Saved to disk')) {
                return NextResponse.json({ success: true, warning: true, message: 'Saved to Local Disk (Git not found)' });
            }
            throw e;
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
