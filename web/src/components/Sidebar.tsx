'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Folder, FileText, ChevronRight, ChevronDown, Server } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside className="w-64 border-r border-slate-200 bg-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                    Git-CMS
                </h1>
                <p className="text-xs text-slate-400 mt-1">Filesystem: VS_Collab</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {/* Project Root */}
                <div className="space-y-1">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-md"
                    >
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <Folder size={16} className="text-indigo-500" />
                        VS Collaboration
                    </button>

                    {/* Children */}
                    {isOpen && (
                        <div className="ml-6 space-y-1 border-l-2 border-slate-100 pl-2">
                            <SidebarItem
                                title="Requirements"
                                href="/docs/VS_Collaboration/Requirements"
                                active={pathname === '/docs/VS_Collaboration/Requirements'}
                            />
                            <SidebarItem
                                title="PRD (Product Spec)"
                                href="/docs/VS_Collaboration/PRD"
                                active={pathname === '/docs/VS_Collaboration/PRD'}
                            />
                            <SidebarItem
                                title="TRD (Tech Spec)"
                                href="/docs/VS_Collaboration/TRD"
                                active={pathname === '/docs/VS_Collaboration/TRD'}
                            />
                            <SidebarItem
                                title="Development Workflow"
                                href="/docs/VS_Collaboration/WORKFLOW"
                                active={pathname === '/docs/VS_Collaboration/WORKFLOW'}
                            />
                            <SidebarItem
                                title="Deployment Guide"
                                href="/docs/VS_Collaboration/DEPLOY_GUIDE"
                                active={pathname === '/docs/VS_Collaboration/DEPLOY_GUIDE'}
                            />
                            <SidebarItem
                                title="User Guide"
                                href="/docs/VS_Collaboration/User_Guide"
                                active={pathname === '/docs/VS_Collaboration/User_Guide'}
                            />
                        </div>
                    )}
                </div>
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Server size={12} /> Local Git Connected
                </div>
            </div>
        </aside>
    );
}

function SidebarItem({ title, href, active }: { title: string, href: string, active: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
        >
            <FileText size={14} className={active ? "text-indigo-500" : "text-slate-400"} />
            {title}
        </Link>
    )
}
