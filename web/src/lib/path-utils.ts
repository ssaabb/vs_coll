import path from 'path';
import fs from 'fs/promises';

export async function getContentDir() {
    // 1. Try sibling 'content' (Local Dev structure)
    // process.cwd() is 'web' usually
    const localContent = path.resolve(process.cwd(), '../content');

    try {
        await fs.access(localContent);
        return localContent;
    } catch {
        // 2. Try nested 'content' (Vercel Prod structure after prebuild)
        const prodContent = path.join(process.cwd(), 'content');
        return prodContent;
    }
}
