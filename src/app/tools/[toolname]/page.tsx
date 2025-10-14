import { db } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Server-side function to get the tool URL
async function getUrlFromMapping(email: string): Promise<string | undefined> {
    try {
        const res = await fetch(`https://stt.pecha.tools/api/mapping/${email}`);
        if (!res.ok) {
            console.error('Error fetching mapping: response not ok', res.status);
            return undefined;
        }
        const mappedUrl = await res.json();
        return mappedUrl.error ? undefined : mappedUrl;
    } catch (err) {
        console.error('Error fetching mapping:', err);
        return undefined;
    }
}

async function getToolUrl(toolName: string, user: any): Promise<string | undefined> {
  const formattedToolName = toolName.replaceAll(" ", "_");
  const tool = await db.oldTools.findFirst({
    where: { name: formattedToolName },
  });

  if (!tool) return undefined;

  // Anonymous users get the demo URL
  if (!user?.email) return tool.demo ?? undefined;

  // For logged-in users
  let path = tool.url;

  // If URL is missing and department is present, fetch from mapping
  if (!path && tool.department?.length > 0) {
    path = await getUrlFromMapping(user.email) ?? null;
  } else if (path) {
    // Append session info to existing URL
    path = `${path}?session=${encodeURIComponent(user.email)}`;
  }

  return path ?? undefined;
}


// Client Component to display the Iframe
interface ToolViewerProps {
    readonly toolName: string;
    readonly toolUrl: string;
}

function ToolViewer({ toolName, toolUrl }: ToolViewerProps) {
    'use client';
    return (
        <div className="flex flex-col h-screen bg-neutral-50 dark:bg-neutral-900">
            <header className="flex items-center justify-between p-2 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    <ArrowLeft className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                </Link>
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{toolName}</h1>
                </div>
            </header>
            <div className="flex-1">
                <iframe
                src={toolUrl}
                className="w-full h-full border-0"
                title={toolName}
                sandbox="allow-scripts allow-same-origin allow-forms"
                />
            </div>
        </div>
    );
}

interface PageProps {
  readonly params: Promise<{ readonly toolname: string }>; // Assuming 'toolname' is your dynamic route segment
}

// Main Page Component (Server Component)
export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const toolname = decodeURIComponent(resolvedParams.toolname);
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    // Or handle redirection to login
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900">
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Please log in to access this tool</h1>
            <Link href="/api/auth/login" className="mt-4 text-primary-600 hover:underline">
                Login
            </Link>
        </div>
    );
  }
  
  const toolUrl = await getToolUrl(toolname, user);

  if (!toolUrl) {
    return <div className="flex flex-col items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Tool not found</h1>
      <div>contact admin to get access</div>
    </div>;
  }

  return <ToolViewer toolName={toolname} toolUrl={toolUrl} />;
}
