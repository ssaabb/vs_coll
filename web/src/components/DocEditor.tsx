'use client';

import { useState } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DocEditorProps {
    path: string;
    initialContent: string;
}

export function DocEditor({ path, initialContent }: DocEditorProps) {
    const [content, setContent] = useState(initialContent);
    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleSave = async () => {
        setStatus('saving');
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path, content, message: `Update ${path} via UI` }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to save');

            if (data.warning) {
                setStatus('success'); // visual success
                // Maybe a different color for partial? For now success is fine, message helps
                alert(data.message); // Simple alert for MVP
            } else {
                setStatus('success');
            }

            router.refresh();

            setTimeout(() => setStatus('idle'), 3000);
        } catch (err: any) {
            setStatus('error');
            setErrorMsg(err.message);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full p-4 text-sm font-mono focus:outline-none resize-none bg-transparent"
                placeholder="Type markdown here..."
            />

            <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <div className="text-xs text-slate-400">
                    {status === 'idle' && 'Ready to save'}
                    {status === 'saving' && 'Saving to Git...'}
                    {status === 'success' && 'Saved!'}
                    {status === 'error' && errorMsg}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setContent(initialContent)}
                        className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={status === 'saving'}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 text-xs font-medium disabled:opacity-50"
                    >
                        <Save size={14} /> Save
                    </button>
                </div>
            </div>
        </div>
    );
}
