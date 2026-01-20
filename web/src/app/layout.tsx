import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Git-CMS: Antigravity',
    description: 'Git-based documentation system',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "bg-slate-50 text-slate-900 antialiased")}>
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="ml-64 flex-1 p-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
