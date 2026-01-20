import { simpleGit, SimpleGit } from 'simple-git';
import path from 'path';
import fs from 'fs/promises';

// Initialize with the parent directory (Project Root)
// We assume the web app is running in /web, so we go up one level.
const ROOT_DIR = path.resolve(process.cwd(), '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');

class GitService {
    private git: SimpleGit;

    constructor() {
        this.git = simpleGit(ROOT_DIR);
    }

    async init() {
        const isRepo = await this.git.checkIsRepo();
        if (!isRepo) {
            await this.git.init();
        }
        return true;
    }

    async getLog(relativePath: string) {
        try {
            // relativePath from content dir, e.g. "PRD.md"
            // Git expects path relative to repo root: "content/PRD.md"
            const repoPath = path.join('content', relativePath);
            const log = await this.git.log({ file: repoPath, maxCount: 10 });
            return log;
        } catch (e) {
            console.error("Git Log Error", e);
            return null;
        }
    }

    async getStatus() {
        return this.git.status();
    }

    async saveFile(relativePath: string, content: string, message: string) {
        const fullPath = path.join(CONTENT_DIR, relativePath);
        const repoPath = path.join('content', relativePath);

        try {

            // 1. Write file
            await fs.writeFile(fullPath, content, 'utf-8');

            // 2. Add
            await this.git.add(repoPath);

            // 3. Commit
            const result = await this.git.commit(message, [repoPath]);
            return result;
        } catch (error: any) {
            console.error("Git Operation Failed", error);
            // Fallback: If it's just a Git error but file is written, we consider it a partial success
            // Check if file physically exists to confirm write success
            try {
                await fs.access(fullPath);
                // If we are here, fs.write was successful.
                // Throw specific error to let UI know
                throw new Error(`Saved to disk, but Git commit failed: ${error.message}`);
            } catch (fsErr) {
                throw new Error(`Failed to save file: ${error.message}`);
            }
        }
    }
}

export const gitService = new GitService();
