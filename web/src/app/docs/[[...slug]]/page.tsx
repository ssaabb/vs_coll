import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { DocEditor } from '@/components/DocEditor';

// Next.js 15+: params is a Promise
interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

// Force dynamic because we read from FS which can change
export const dynamic = 'force-dynamic';

async function getDocContent(slug: string[] = []) {
    try {
        const targetSlug = (!slug || slug.length === 0) ? ['VS_Collaboration', 'Requirements'] : slug;

        let fileName = targetSlug.join('/');
        if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) {
            fileName += '.md';
        }

        // Robust path resolution
        // We assume we are in /web, so content is in ../content
        const CONTENT_DIR = path.resolve(process.cwd(), '../content');
        const fullPath = path.join(CONTENT_DIR, fileName);

        await fs.access(fullPath);

        const fileContent = await fs.readFile(fullPath, 'utf-8');
        const { content, data } = matter(fileContent);

        return { content, frontmatter: data, path: fileName, raw: fileContent };
    } catch (e) {
        console.error("Read Error:", e);
        return null;
    }
}

export default async function DocPage(props: PageProps) {
    const params = await props.params;
    const doc = await getDocContent(params.slug);

    if (!doc) {
        // Debug info on 404
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-rose-600">404 - Document Not Found</h1>
                <p className="mt-4">Could not load document.</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
            <div className="mb-4 border-b pb-2 flex-none">
                <h1 className="text-2xl font-bold text-slate-900">
                    {doc.frontmatter.title || path.basename(doc.path)}
                </h1>
                <div className="text-xs text-slate-500 font-mono">
                    {doc.path}
                </div>
            </div>

            <div className="flex-1 flex gap-6 min-h-0">
                {/* Left: Preview (Reading) */}
                <div className="flex-1 overflow-y-auto bg-white p-6 rounded-lg border border-slate-200 shadow-sm prose prose-slate max-w-none">
                    <div className="sticky top-0 bg-white/90 backdrop-blur pb-2 mb-4 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Preview
                    </div>
                    <MDXRemote source={doc.content} />
                </div>

                {/* Right: Editor */}
                <div className="flex-1 flex flex-col min-h-0 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Editor</span>
                    </div>
                    <DocEditor key={doc.path} path={doc.path} initialContent={doc.raw} />
                </div>
            </div>
        </div>
    );
}
