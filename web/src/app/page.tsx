import Link from 'next/link';
import { ArrowRight, Book, GitBranch, Terminal } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-slate-100 text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Book size={32} />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Git-CMS</h1>
                <p className="text-slate-500 mb-8">
                    Git-based Hybrid Documentation System
                </p>

                <div className="space-y-3">
                    <Link
                        href="/docs"
                        className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                    >
                        Go to Docs <ArrowRight size={18} />
                    </Link>

                    <Link
                        href="/test"
                        className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-200 font-medium transition-colors"
                    >
                        <Terminal size={18} /> Check /test Status
                    </Link>

                    <div className="pt-4 border-t border-slate-100 mt-4">
                        <p className="text-xs text-slate-400">
                            If you see this page, the Vercel Deployment is SUCCESSFUL.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
